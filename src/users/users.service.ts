import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from 'src/entities/user.entity'
import { CreateUserDto, UpdateUserDto } from 'src/dtos/user.dto'
import { Book } from 'src/entities/book.entity'

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Book)
        private booksRepository: Repository<Book>
    ) {}

    async getAll() {
        const users = await this.usersRepository.find()
        return users
    }

    async getOne(id: number) {
        const user = await this.usersRepository.findOne({id}, {relations: ['books']})
        if (!user) return "there is no such user"
        return user
    }

    async create(dto: CreateUserDto){
        const candidate = this.usersRepository.create(dto)
        const newUser = await this.usersRepository.save(candidate)
        return newUser
    }

    async update(id: number, dto: UpdateUserDto) {
        return await this.usersRepository.update(id, {...dto})
    }

    delete(id: number) {
        return this.usersRepository.delete(id)
    }

    async hasSubscription(id: number) {
        const user = await this.usersRepository.findOne({id})
        if (!user) return "there is no such user"
        if (user.hasSubscriprion === true) {
            return `${user.firstName} ${user.secondName} has a subscription`
        }
        return `${user.firstName} ${user.secondName} doesn't have a subscription`
    }

    async giveSubscription(id: number) {
        const user = await this.usersRepository.findOne({id})
        if (!user) return "there is no such user"
        if (user.hasSubscriprion === true) {
            return `${user.firstName} ${user.secondName} already has a subscription`
        }
        const updatedUser = await this.usersRepository.update(id, {hasSubscriprion: true})
        return `${user.firstName} ${user.secondName} has a subscription now`
    }

    async giveBook(userId: number, bookId: number) {

        const user = await this.usersRepository.findOne({id: userId}, {relations: ['books']})
        if (!user) return "there is no such user"

        // Checking whether the user have more than 5 books
        if (user.books.length === 5) {return `${user.firstName} ${user.secondName} can't have more than 5 books`}

        this.booksRepository.update({id: bookId}, {owner: user})
        return `book was given to ${user.firstName} ${user.secondName}`
    }


    async removeBook(userId: number, bookId: number) {
        const user = await this.usersRepository.findOne({id: userId})
        if (!user) return "there is no such user"
        this.booksRepository.update({id: bookId}, {owner: undefined})
        return `the book was returned by ${user.firstName} ${user.secondName}`
        
    }

}
