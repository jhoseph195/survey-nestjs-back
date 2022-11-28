import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { ErroredResponse, SuccessResponse } from '../../schemas/http-responses.interface';
import { GetCompanysDto, PostCompanysDto } from './company.dto';
import { CompanyService } from './company.service';
import { Response, Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('company')
@Controller('company')
@ApiBearerAuth('access-token')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Get()
    async getCompanys(@Query() queryDTO: GetCompanysDto, @Req() req: Request, @Res()res: Response) {
        const response: ErroredResponse | SuccessResponse = await this.companyService.getCompanys(req, queryDTO)
        return res.status(response.status).json(response)
    }

    @Get('/:id')
    async getCompanyById(@Param('id') id: number, @Res()res: Response) {
        const response: ErroredResponse | SuccessResponse = await this.companyService.getCompanyById(id)
        return res.status(response.status).json(response)
    }

    @Post()
    async createCompany(@Body() bodyDTO: PostCompanysDto, @Res()res: Response) {
        const response: ErroredResponse | SuccessResponse = await this.companyService.createCompany(bodyDTO)
        return res.status(response.status).json(response)
    }

    @Put('/:id')
    async putCompany(@Param('id') id: number, @Body() bodyDTO: PostCompanysDto, @Res()res: Response) {
        const response: ErroredResponse | SuccessResponse = await this.companyService.putCompany(id, bodyDTO)
        return res.status(response.status).json(response)
    }

    @Delete('/:id')
    async deleteCompany(@Param('id') id: number, @Res()res: Response) {
        const response: ErroredResponse | SuccessResponse = await this.companyService.deleteCompany(id)
        return res.status(response.status).json(response)
    }
}
