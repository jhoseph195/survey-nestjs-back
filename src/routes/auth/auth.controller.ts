import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { PostLoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { ErroredResponse, successResponse, SuccessResponse } from '../../schemas/http-responses.interface';
import { Public } from '../../decorators/guards.decorator';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @Public()
    async login(@Body() bodyDTO: PostLoginDto, @Req() req: Request, @Res()res: Response) {
        const response: ErroredResponse | SuccessResponse = await this.authService.login(bodyDTO, req)
        return res.status(response.status).json(response)
    }

    @Post('logout')
    @ApiBearerAuth('access-token')
    logout(@Req() req: Request, @Res()res: Response) {
      req.session.destroy(() => {
        return res.status(200).json(successResponse(200, 'Éxito', {}))
      })
    }
}
