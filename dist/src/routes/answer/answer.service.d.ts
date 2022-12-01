import { Repository } from 'typeorm';
import { Answer } from '../../entities/answer.entity';
import { GetAnswerDto, PostAnswerDto } from './answer.dto';
import { Request } from 'express';
export declare class AnswerService {
    private answersRepository;
    constructor(answersRepository: Repository<Answer>);
    getAnswers(req: Request, queryDTO: GetAnswerDto): Promise<import("../../schemas/http-responses.interface").SuccessResponse>;
    getAnswerById(id: number): Promise<import("../../schemas/http-responses.interface").SuccessResponse>;
    createAnswer(bodyDTO: PostAnswerDto): Promise<import("../../schemas/http-responses.interface").SuccessResponse>;
}
