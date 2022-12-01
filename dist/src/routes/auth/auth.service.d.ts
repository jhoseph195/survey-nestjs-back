import { PostLoginDto } from './auth.dto';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Session } from '../../entities/session.entity';
export declare class AuthService {
    private usersRepository;
    private sessionsRepository;
    constructor(usersRepository: Repository<User>, sessionsRepository: Repository<Session>);
    login(bodyDTO: PostLoginDto, request: Request): Promise<import("../../schemas/http-responses.interface").SuccessResponse | import("../../schemas/http-responses.interface").ErroredResponse>;
    logout(req: Request): Promise<import("../../schemas/http-responses.interface").SuccessResponse>;
}
