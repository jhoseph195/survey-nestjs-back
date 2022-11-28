import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { GetUsersDto, PostUsersDto } from './user.dto';
import { Request } from 'express';
export declare class UserService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    createUSerIfNotExist(): Promise<void>;
    getUsers(req: Request, queryDTO: GetUsersDto): Promise<import("../../schemas/http-responses.interface").SuccessResponse>;
    getUserById(id: number): Promise<import("../../schemas/http-responses.interface").SuccessResponse>;
    createUser(bodyDTO: PostUsersDto): Promise<import("../../schemas/http-responses.interface").SuccessResponse>;
    putUser(id: number, bodyDTO: PostUsersDto): Promise<import("../../schemas/http-responses.interface").SuccessResponse>;
    deleteUser(id: number): Promise<import("../../schemas/http-responses.interface").SuccessResponse>;
}
