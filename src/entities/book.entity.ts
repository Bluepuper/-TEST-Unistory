import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Book {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    author: string

    @ManyToOne(() => User, user => user.books)
    owner: User

}