import { Module } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Book } from 'src/entities/book.entity'
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from 'src/books/books.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User, Book]),
    BooksModule
  ]
})
export class UsersModule {}
