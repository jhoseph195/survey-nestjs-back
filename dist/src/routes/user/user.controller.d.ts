import { GetUsersDto, PostUsersDto } from './user.dto';
import { UserService } from './user.service';
import { Response, Request } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(queryDTO: GetUsersDto, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getUserById(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    createUser(bodyDTO: PostUsersDto, res: Response): Promise<Response<any, Record<string, any>>>;
    putUser(id: number, bodyDTO: PostUsersDto, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteUser(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
}
