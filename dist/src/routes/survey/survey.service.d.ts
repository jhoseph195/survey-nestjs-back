import { Repository } from 'typeorm';
import { Survey } from '../../entities/survey.entity';
import { GetSurveysDto, PostSurveysDto } from './survey.dto';
import { Request } from 'express';
export declare class SurveyService {
    private surveysRepository;
    constructor(surveysRepository: Repository<Survey>);
    getSurveys(req: Request, queryDTO: GetSurveysDto): Promise<import("../../schemas/http-responses.interface").SuccessResponse>;
    getSurveyById(id: number): Promise<import("../../schemas/http-responses.interface").SuccessResponse>;
    createSurvey(bodyDTO: PostSurveysDto): Promise<import("../../schemas/http-responses.interface").SuccessResponse>;
    putSurvey(id: number, bodyDTO: PostSurveysDto): Promise<import("../../schemas/http-responses.interface").SuccessResponse>;
    deleteSurvey(id: number): Promise<import("../../schemas/http-responses.interface").SuccessResponse>;
}
