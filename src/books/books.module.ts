import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Book } from 'src/entities/book.entity';

@Module({
  providers: [BooksService],
  controllers: [BooksController],
  imports: [TypeOrmModule.forFeature([Book])],
  exports: [BooksModule]
})
export class BooksModule {}
