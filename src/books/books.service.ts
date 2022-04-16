import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Book } from 'src/entities/book.entity'
import { CreateBookDto } from 'src/dtos/book.dto'

@Injectable()
export class BooksService {

    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>
    ) {}

    async create(dto: CreateBookDto){
        const scaffold = this.booksRepository.create(dto)
        const newBook = await this.booksRepository.save(scaffold)
        return newBook
    }
}
