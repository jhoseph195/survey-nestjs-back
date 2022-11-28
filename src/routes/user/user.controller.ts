import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ErroredResponse, SuccessResponse } from '../../schemas/http-responses.interface';
import { GetUsersDto, PostUsersDto } from './user.dto';
import { UserService } from './user.service';
import { Response, Request } from 'express';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth('access-token')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getUsers(@Query() queryDTO: GetUsersDto, @Req() req: Request, @Res()res: Response) {
        const response: ErroredResponse | SuccessResponse = await this.userService.getUsers(req, queryDTO)
        return res.status(response.status).json(response)
    }
    
    @Get('/:id')
    async getUserById(@Param('id') id: number, @Res()res: Response) {
        const response: ErroredResponse | SuccessResponse = await this.userService.getUserById(id)
        return res.status(response.status).json(response)
    }

    @Post()
    async createUser(@Body() bodyDTO: PostUsersDto, @Res()res: Response) {
        const response: ErroredResponse | SuccessResponse = await this.userService.createUser(bodyDTO)
        return res.status(response.status).json(response)
    }

    @Put('/:id')
    async putUser(@Param('id') id: number, @Body() bodyDTO: PostUsersDto, @Res()res: Response) {
        const response: ErroredResponse | SuccessResponse = await this.userService.putUser(id, bodyDTO)
        return res.status(response.status).json(response)
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: number, @Res()res: Response) {
        const response: ErroredResponse | SuccessResponse = await this.userService.deleteUser(id)
        return res.status(response.status).json(response)
    }
}
