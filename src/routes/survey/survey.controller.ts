import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SurveyService } from './survey.service';
import { Response, Request } from 'express';
import { GetSurveysDto, PostSurveysDto } from './survey.dto';
import { ErroredResponse, SuccessResponse } from '../../schemas/http-responses.interface';

@ApiTags('survey')
@Controller('survey')
@ApiBearerAuth('access-token')
export class SurveyController {
    constructor(private readonly surveyService: SurveyService) {}

    @Get()
    async getSurveys(@Query() queryDTO: GetSurveysDto, @Req() req: Request, @Res()res: Response) {
        const response: ErroredResponse | SuccessResponse = await this.surveyService.getSurveys(req, queryDTO)
        return res.status(response.status).json(response)
    }
    
    @Get('/:id')
    async getUserById(@Param('id') id: number, @Res()res: Response) {
        const response: ErroredResponse | SuccessResponse = await this.surveyService.getSurveyById(id)
        return res.status(response.status).json(response)
    }

    @Post()
    async createSurvey(@Body() bodyDTO: PostSurveysDto, @Res()res: Response) {
        const response: ErroredResponse | SuccessResponse = await this.surveyService.createSurvey(bodyDTO)
        return res.status(response.status).json(response)
    }

    @Put('/:id')
    async putSurvey(@Param('id') id: number, @Body() bodyDTO: PostSurveysDto, @Res()res: Response) {
        const response: ErroredResponse | SuccessResponse = await this.surveyService.putSurvey(id, bodyDTO)
        return res.status(response.status).json(response)
    }

    @Delete('/:id')
    async deleteSurvey(@Param('id') id: number, @Res()res: Response) {
        const response: ErroredResponse | SuccessResponse = await this.surveyService.deleteSurvey(id)
        return res.status(response.status).json(response)
    }
}
