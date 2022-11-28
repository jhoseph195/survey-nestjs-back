import { SurveyService } from './survey.service';
import { Response, Request } from 'express';
import { GetSurveysDto, PostSurveysDto } from './survey.dto';
export declare class SurveyController {
    private readonly surveyService;
    constructor(surveyService: SurveyService);
    getSurveys(queryDTO: GetSurveysDto, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getUserById(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    createSurvey(bodyDTO: PostSurveysDto, res: Response): Promise<Response<any, Record<string, any>>>;
    putSurvey(id: number, bodyDTO: PostSurveysDto, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteSurvey(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
}
