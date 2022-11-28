import { PostLoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(bodyDTO: PostLoginDto, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, res: Response): void;
}
