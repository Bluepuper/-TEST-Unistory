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

    /**
     * This method returns all users
     */
    async getAll() {
        const users = await this.usersRepository.find()
        return users
    }

    /**
     * This method returns one user with exact id
     */
    async getOne(id: number) {
        const user = await this.usersRepository.findOne({id}, {relations: ['books']})
        if (!user) return new Error("There is no such user")
        return user
    }

    /**
     * This method creates a user
     */
    async create(dto: CreateUserDto){
        const candidate = this.usersRepository.create(dto)
        const newUser = await this.usersRepository.save(candidate)
        return newUser
    }

    /**
     * This method updates user's data
     */
    async update(id: number, dto: UpdateUserDto) {
        return await this.usersRepository.update(id, {...dto})
    }

    /**
     * This method will delete exact user
     */
    delete(id: number) {
        return this.usersRepository.delete(id)
    }

    /**
     * This method checks whether the user has subscription or not
     * @returns `true | false`
     */
    async hasSubscription(id: number) {
        const user = await this.usersRepository.findOne({id})
        if (!user) return new Error("There is no such user")
        if (user.hasSubscriprion) {
            return true
        }
        return false
    }

    /**
     * This method gives subscription to exact user
     */
    async giveSubscription(id: number) {
        const user = await this.usersRepository.findOne({id})
        if (!user) new Error("There is no such user")
        if (user.hasSubscriprion === true) {
            return new Error(`${user.firstName} ${user.secondName} already has a subscription`)
        }
        const updatedUser = await this.usersRepository.update(id, {hasSubscriprion: true})
        return `${user.firstName} ${user.secondName} has a subscription now`
    }

    /**
     * This method gives book to exact user
     */
    async giveBook(userId: number, bookId: number) {

        const user = await this.usersRepository.findOne({id: userId}, {relations: ['books']})
        if (!user) return new Error("There is no such user")

        // Checking whether the user have more than 5 books
        if (user.books.length === 5) {return new Error(`${user.firstName} ${user.secondName} can't have more than 5 books`)}

        this.booksRepository.update({id: bookId}, {owner: user})
        return `book was given to ${user.firstName} ${user.secondName}`
    }

    /**
     * This method takes book back from exact user
     */
    async removeBook(userId: number, bookId: number) {
        const user = await this.usersRepository.findOne({id: userId})
        if (!user) return "there is no such user"
        this.booksRepository.update({id: bookId}, {owner: undefined})
        return `the book was returned by ${user.firstName} ${user.secondName}`
        
    }

}
