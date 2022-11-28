import { PostLoginDto } from './auth.dto';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
export declare class AuthService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    login(bodyDTO: PostLoginDto, request: Request): Promise<import("../../schemas/http-responses.interface").SuccessResponse | import("../../schemas/http-responses.interface").ErroredResponse>;
}
