import { Body, Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AnswerService } from './answer.service';
import { Response, Request } from 'express';
import { ErroredResponse, SuccessResponse } from '../../schemas/http-responses.interface';
import { GetAnswerDto, PostAnswerDto } from './answer.dto';

@ApiTags('answer')
@Controller('answer')
@ApiBearerAuth('access-token')
export class AnswerController {
    constructor(private readonly answerService: AnswerService) {}

    @Get()
    async getAnswers(@Query() queryDTO: GetAnswerDto, @Req() req: Request, @Res()res: Response) {
        const response: ErroredResponse | SuccessResponse = await this.answerService.getAnswers(req, queryDTO)
        return res.status(response.status).json(response)
    }
    
    @Get('/:id')
    async getAnswerById(@Param('id') id: number, @Res()res: Response) {
        const response: ErroredResponse | SuccessResponse = await this.answerService.getAnswerById(id)
        return res.status(response.status).json(response)
    }

    @Post()
    async createAnswer(@Body() bodyDTO: PostAnswerDto, @Res()res: Response) {
        const response: ErroredResponse | SuccessResponse = await this.answerService.createAnswer(bodyDTO)
        return res.status(response.status).json(response)
    }
}
