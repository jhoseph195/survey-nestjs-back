import { Injectable } from '@nestjs/common';
import { EOrigin, PostLoginDto } from './auth.dto';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EType, User } from '../../entities/user.entity';
import { sha256 } from 'js-sha256';
import { erroredResponse, successResponse } from '../../schemas/http-responses.interface';

@Injectable()
export class AuthService {
    constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>,
    ) {}

    async login(bodyDTO: PostLoginDto, request: Request) {
        const user = await this.usersRepository.findOne({
            relations: {
                company: true,
            },
            where: {
                email: bodyDTO.email,
                password: sha256(bodyDTO.password),
                isDeleted: false
            }
        });

        delete user.password;

        if (user) {
            if ((bodyDTO.origin == EOrigin.WEB && user.type != EType.CAPTURIST) || bodyDTO.origin == EOrigin.APP) {
                request.session['user'] = user;
                request.session['origin'] = bodyDTO.origin;
                
                return successResponse(200, 'Éxito', { token: request.sessionID });
            } else {
                return erroredResponse(403, {}, 'No tienes los permisos necesarios para ingresar al sistema');
            }
        }

        return erroredResponse(403, {}, 'Credenciales incorrectas');
    }
}
