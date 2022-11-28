import { Body, Injectable, Query, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { EType, User } from '../../entities/user.entity';
import { successResponse } from '../../schemas/http-responses.interface';
import { GetUsersDto, PostUsersDto } from './user.dto';
import { Request } from 'express';
import { sha256 } from 'js-sha256';

@Injectable()
export class UserService {
    constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>,
    ) {
        this.createUSerIfNotExist()
    }

    async createUSerIfNotExist() {
        const user = await this.usersRepository.findOneBy({ id: 1 })

        if (!user) {
            await this.usersRepository.insert({
                "id": 1,
                "name": "Super Admin Survey",
                "email": "admin@survey.com",
                "password": "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",
                "type": EType.SUPER_ADMIN,
                "company": {"id": 1},
                "isDeleted": false,
            });
        } else {
            await this.usersRepository.update(1, {
                "name": "Super Admin Survey",
                "email": "admin@survey.com",
                "password": "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",
                "type": EType.SUPER_ADMIN,
                "company": {"id": 1},
                "isDeleted": false,
            });

        }
    }
    
    async getUsers(@Req() req: Request, @Query() queryDTO: GetUsersDto) {
        const filters: any = {
            relations: {
                company: true,
            },
            where: {}
        };
        const filtersCount: any = { where: {} };
        const where: any = {isDeleted: false};

        if (queryDTO.companyId) {
            where.company = {id: queryDTO.companyId}
        }
        
        if (req.session['user'] && req.session['user'].type != EType.SUPER_ADMIN) {
            where.company = {id: req.session['user'].company.id}
        }

        if (queryDTO.filter) {
            const tempFilters = [];

            tempFilters.push({...where, name: Like(`%${queryDTO.filter}%`)});
            tempFilters.push({...where, email: Like(`%${queryDTO.filter}%`)});

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

        const response = await this.usersRepository.find(filters);
        const responseCount = await this.usersRepository.count(filtersCount);

        return successResponse(200, 'Éxito', response, responseCount);
    }
    
    async getUserById(id: number) {
        const response = await this.usersRepository.findOne({
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

    async createUser(@Body() bodyDTO: PostUsersDto) {
        const data = {...bodyDTO, company: {id: bodyDTO.companyId}};
        data.password = sha256(bodyDTO.password);

        const response = await this.usersRepository.insert(data);
        
        return successResponse(200, 'Éxito', response);
    }

    async putUser(id: number, @Body() bodyDTO: PostUsersDto) {
        const data = {...bodyDTO, company: {id: bodyDTO.companyId}};
        delete data.companyId;

        if (bodyDTO.password && bodyDTO.password.trim() != '') {    
            data.password = sha256(bodyDTO.password);
        }

        if (bodyDTO.password && bodyDTO.password.trim() == '') {
            delete data.password;
        }

        const response = await this.usersRepository.update(id, data);
        
        return successResponse(200, 'Éxito', response);
    }

    async deleteUser(id: number) {
        const response = await this.usersRepository.update(id, {isDeleted: true});
        
        return successResponse(200, 'Éxito', response);
    }
}
