import { Body, Controller, Post } from '@nestjs/common'
import { CreateBookDto } from 'src/dtos/book.dto'
import { BooksService } from './books.service'

@Controller('books')
export class BooksController {

    constructor(private booksService: BooksService) {}

    @Post('/create')
    create(
        @Body() dto: CreateBookDto
    ) {
        return this.booksService.create(dto)
    }
}
