import { AnswerService } from './answer.service';
import { Response, Request } from 'express';
import { GetAnswerDto, PostAnswerDto } from './answer.dto';
export declare class AnswerController {
    private readonly answerService;
    constructor(answerService: AnswerService);
    getAnswers(queryDTO: GetAnswerDto, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAnswerById(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    createAnswer(bodyDTO: PostAnswerDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
