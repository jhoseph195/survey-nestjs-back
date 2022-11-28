import { Body, Injectable, Query, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Company } from '../../entities/company.entity';
import { successResponse } from '../../schemas/http-responses.interface';
import { GetCompanysDto, PostCompanysDto } from './company.dto';
import { Request } from 'express';
import { EType } from '../../entities/user.entity';

@Injectable()
export class CompanyService {
    constructor(
      @InjectRepository(Company)
      private companysRepository: Repository<Company>,
    ) {
        this.createCompanyIfNotExist()
    }

    async createCompanyIfNotExist() {
        const company = await this.companysRepository.findOneBy({ id: 1 })

        if (!company) {
            await this.companysRepository.insert({
                "id": 1,
                "socialReason": "Survey SA de CV",
                "business": "Tecnologías de la Información",
                "email": "contacto@survey.com",
                "phone": "3311223344",
                "address": "COLON NO. 182 NO. B",
                "neighborhood": "CENTRO, Jal",
                "postalCode": "49000",
                "isDeleted": false,
            });
        } else {
            await this.companysRepository.update(1, {
                "socialReason": "Survey SA de CV",
                "business": "Tecnologías de la Información",
                "email": "contacto@survey.com",
                "phone": "3311223344",
                "address": "COLON NO. 182 NO. B",
                "neighborhood": "CENTRO, Jal",
                "postalCode": "49000",
                "isDeleted": false
            });

        }
    }
    async getCompanys(@Req() req: Request, @Query() queryDTO: GetCompanysDto) {
        const filters: any = {
            where: {}
        };
        const filtersCount: any = { where: {} };
        const where: any = {isDeleted: false};

        if (req.session['user'] && req.session['user'].type != EType.SUPER_ADMIN) {
            where.id = req.session['user'].company.id
        }

        if (queryDTO.filter) {
            const tempFilters = [];

            tempFilters.push({...where, socialReason: Like(`%${queryDTO.filter}%`)});
            tempFilters.push({...where, business: Like(`%${queryDTO.filter}%`)});
            tempFilters.push({...where, email: Like(`%${queryDTO.filter}%`)});
            tempFilters.push({...where, phone: Like(`%${queryDTO.filter}%`)});

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

        const response = await this.companysRepository.find(filters);
        const responseCount = await this.companysRepository.count(filtersCount);

        return successResponse(200, 'Éxito', response, responseCount);
    }

    async getCompanyById(id: number) {
        const response = await this.companysRepository.findOne({
            where: {
                id,
                isDeleted: false
            }
        });

        return successResponse(200, 'Éxito', response);
    }

    async createCompany(@Body() bodyDTO: PostCompanysDto) {
        const response = await this.companysRepository.insert({...bodyDTO});
        
        return successResponse(200, 'Éxito', response);
    }

    async putCompany(id: number, @Body() bodyDTO: PostCompanysDto) {
        const response = await this.companysRepository.update(id, {...bodyDTO});
        
        return successResponse(200, 'Éxito', response);
    }

    async deleteCompany(id: number) {
        const response = await this.companysRepository.update(id, {isDeleted: true});
        
        return successResponse(200, 'Éxito', response);
    }
}
