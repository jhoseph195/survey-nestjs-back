import { Repository } from 'typeorm';
import { Company } from '../../entities/company.entity';
import { GetCompanysDto, PostCompanysDto } from './company.dto';
import { Request } from 'express';
export declare class CompanyService {
    private companysRepository;
    constructor(companysRepository: Repository<Company>);
    createCompanyIfNotExist(): Promise<void>;
    getCompanys(req: Request, queryDTO: GetCompanysDto): Promise<import("../../schemas/http-responses.interface").SuccessResponse>;
    getCompanyById(id: number): Promise<import("../../schemas/http-responses.interface").SuccessResponse>;
    createCompany(bodyDTO: PostCompanysDto): Promise<import("../../schemas/http-responses.interface").SuccessResponse>;
    putCompany(id: number, bodyDTO: PostCompanysDto): Promise<import("../../schemas/http-responses.interface").SuccessResponse>;
    deleteCompany(id: number): Promise<import("../../schemas/http-responses.interface").SuccessResponse>;
}
