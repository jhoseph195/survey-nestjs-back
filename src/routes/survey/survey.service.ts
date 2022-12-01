import { Body, Injectable, Query, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Survey } from '../../entities/survey.entity';
import { EType } from '../../entities/user.entity';
import { successResponse } from '../../schemas/http-responses.interface';
import { GetSurveysDto, PostSurveysDto } from './survey.dto';
import { Request } from 'express';

@Injectable()
export class SurveyService {
    constructor(
      @InjectRepository(Survey)
      private surveysRepository: Repository<Survey>,
    ) {}
    
    async getSurveys(@Req() req: Request, @Query() queryDTO: GetSurveysDto) {
        const filters: any = { 
            relations: {
                company: true,
            },
            where: {} 
        };
        const filtersCount: any = { where: {} };
        const where: any = {isDeleted: false};

        if (req.session['user'] && req.session['user'].type != EType.SUPER_ADMIN) {
            where.id = req.session['user'].company.id
        }

        if (queryDTO.filter) {
            const tempFilters = [];

            tempFilters.push({isDeleted: false, title: Like(`%${queryDTO.filter}%`)});
            tempFilters.push({isDeleted: false, description: Like(`%${queryDTO.filter}%`)});

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

        const response = await this.surveysRepository.find(filters);
        const responseCount = await this.surveysRepository.count(filtersCount);

        return successResponse(200, 'Éxito', response, responseCount);
    }
    
    async getSurveyById(id: number) {
        const response = await this.surveysRepository.findOne({
            relations: {
                company: true,
            },
            where: {
                id,
                isDeleted: false
            }
        });

        return successResponse(200, 'Éxito', response);
    }

    async createSurvey(@Body() bodyDTO: PostSurveysDto) {
        const data = {...bodyDTO, company: {id: bodyDTO.companyId}};
        delete data.companyId;
        const response = await this.surveysRepository.insert(data);
        
        return successResponse(200, 'Éxito', response);
    }

    async putSurvey(id: number, @Body() bodyDTO: PostSurveysDto) {
        const data = {...bodyDTO, company: {id: bodyDTO.companyId}};
        delete data.companyId;
        const response = await this.surveysRepository.update(id, data);
        
        return successResponse(200, 'Éxito', response);
    }

    async deleteSurvey(id: number) {
        const response = await this.surveysRepository.update(id, {isDeleted: true});
        
        return successResponse(200, 'Éxito', response);
    }
}
