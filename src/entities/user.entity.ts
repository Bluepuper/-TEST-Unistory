import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable } from 'typeorm'
import { Book } from './book.entity'

@Entity()
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    firstName: string

    @Column()
    secondName: string
    
    @Column({default:false})
    hasSubscriprion: boolean

    @OneToMany(() => Book, book => book.owner)   
    books: Book[]
    // @JoinTable()
    // 
}