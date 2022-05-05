import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from 'src/dtos/user.dto'
import { UsersService } from './users.service'



@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}


    @Get()
    getAll() {
        return this.usersService.getAll()
    }

    @Get(':id')
    getOne(
        @Param('id') id: number,
    ) {
        return this.usersService.getOne(id)
    }

    @Post('')
    create(
        @Body() dto: CreateUserDto
    ) {
        return this.usersService.create(dto)
    }

    @Patch(':id')
    update(
        @Param('id') id: number,
        @Body() dto: UpdateUserDto
    ) {
        return this.usersService.update(id, dto)
    }

    @Delete(':id')
    delete(
        @Param('id') id: number,
    ) {
        return this.usersService.delete(id)
    }

    @Get(':id/subscription')
    isMember(
        @Param('id') id: number,
    ) {
        return this.usersService.hasSubscription(id)
    }

    @Patch(':id/subscription')
    giveSubscription(
        @Param('id') id: number,
    ) {
        return this.usersService.giveSubscription(id)
    }

    @Patch(':userId/books/:bookId')
    manageBook(
        @Param() params: {userId: number, bookId: number},
        @Query('manage') manage: string
    ) {
        if (manage === 'give') {return this.usersService.giveBook(params.userId, params.bookId)}
        if (manage === 'remove') {return this.usersService.removeBook(params.userId, params.bookId)}
        
    }

}
