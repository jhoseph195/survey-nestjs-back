import { Injectable } from '@nestjs/common';
import { EOrigin, PostLoginDto } from './auth.dto';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EType, User } from '../../entities/user.entity';
import { sha256 } from 'js-sha256';
import { erroredResponse, successResponse } from '../../schemas/http-responses.interface';
import { Session } from '../../entities/session.entity';
import * as moment from 'moment';

@Injectable()
export class AuthService {
    constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>,
      @InjectRepository(Session)
      private sessionsRepository: Repository<Session>,
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

        if (user) {
            delete user.password;
            if ((bodyDTO.origin == EOrigin.WEB && user.type != EType.CAPTURIST) || bodyDTO.origin == EOrigin.APP) {
                const token = sha256(request.sessionID);
                
                await this.sessionsRepository.insert({
                    token,
                    expires: new Date(moment().add(1, 'days').format()),
                    user: {id: user.id}
                });

                return successResponse(200, 'Éxito', { ...user, token });
            } else {
                return erroredResponse(403, {}, 'No tienes los permisos necesarios para ingresar al sistema');
            }
        }

        return erroredResponse(403, {}, 'Credenciales incorrectas');
    }

    async logout(req: Request) {
        let token: any = req.headers.authorization || req.headers.Authorization;
        token = token.replace('Bearer ', '');

        await this.sessionsRepository.delete({token})

        return successResponse(200, 'Éxito', {});
    }
}
