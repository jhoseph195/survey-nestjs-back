import { Body, Injectable, Query, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Answer } from '../../entities/answer.entity';
import { GetAnswerDto, PostAnswerDto } from './answer.dto';
import { Request } from 'express';
import { EType } from '../../entities/user.entity';
import { successResponse } from '../../schemas/http-responses.interface';

@Injectable()
export class AnswerService {
    constructor(
      @InjectRepository(Answer)
      private answersRepository: Repository<Answer>,
    ) {}
    
    async getAnswers(@Req() req: Request, @Query() queryDTO: GetAnswerDto) {
        const filters: any = { 
            relations: [
                'survey',
                'user',
                'survey.company'
            ],
            where: {} 
        };
        const filtersCount: any = { where: {} };
        const where: any = {isDeleted: false};

        if (queryDTO.surveyId) {
            where.survey = {id: queryDTO.surveyId}
        }

        if (queryDTO.filter) {
            const tempFilters = [];

            tempFilters.push({...where, survey: {title: Like(`%${queryDTO.filter}%`)}});
            tempFilters.push({...where, survey: {description: Like(`%${queryDTO.filter}%`)}});
            tempFilters.push({...where, user: {name: Like(`%${queryDTO.filter}%`)}});

            filters.where = tempFilters;
            filtersCount.where = tempFilters;
        } else {
            filters.where = where;
            filtersCount.where = where;
        }

        if (queryDTO.limit) {
            filters.take = queryDTO.limit
            
            if (queryDTO.page) {
                filters.skip = ((queryDTO.limit * queryDTO.page) - queryDTO.limit);
            }
        }

        const response = await this.answersRepository.find(filters);
        const responseCount = await this.answersRepository.count(filtersCount);

        return successResponse(200, 'Éxito', response, responseCount);
    }
    
    async getAnswerById(id: number) {
        const response = await this.answersRepository.findOne({
            relations: [
                'survey',
                'user',
                'survey.company'
            ],
            where: {
                id,
                isDeleted: false
            }
        });

        return successResponse(200, 'Éxito', response);
    }

    async createAnswer(@Body() bodyDTO: PostAnswerDto) {
        const data = {
            ...bodyDTO,
            survey: {id: bodyDTO.surveyId},
            user: {id: bodyDTO.userId}
        };
        delete data.surveyId;

        const response = await this.answersRepository.insert({...bodyDTO});
        
        return successResponse(200, 'Éxito', response);
    }
}
