import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { BooksService } from './books/books.service'
import { BooksModule } from './books/books.module'
import { UsersService } from './users/users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Book } from './entities/book.entity'


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
        envFilePath: '.env'
        }),
        TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost', //process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        autoLoadEntities: true,
        synchronize: true,
        }),
        UsersModule,
        BooksModule,
    ],
})
export class AppModule {}
