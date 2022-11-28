import { GetCompanysDto, PostCompanysDto } from './company.dto';
import { CompanyService } from './company.service';
import { Response, Request } from 'express';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    getCompanys(queryDTO: GetCompanysDto, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getCompanyById(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    createCompany(bodyDTO: PostCompanysDto, res: Response): Promise<Response<any, Record<string, any>>>;
    putCompany(id: number, bodyDTO: PostCompanysDto, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteCompany(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
}
