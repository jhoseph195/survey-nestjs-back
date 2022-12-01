import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { MoreThan, Repository } from 'typeorm';
import { Session } from '../../entities/session.entity';
import { erroredResponse } from '../../schemas/http-responses.interface';

@Injectable()
export class SessionValidatorGuard implements CanActivate {
  
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
  ) {}
  
  canActivate( context: ExecutionContext):  boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const isPublic = this.reflector.get<boolean>( "isPublic", context.getHandler() );
    
    if(isPublic) {
      return true;
    }
    
    if (req.headers && !req.headers.authorization && !req.headers.Authorization) {
      throw new UnauthorizedException(erroredResponse(401, {}, `No se encontro la cabecera 'Authorization'`));
    }

    let token = req.headers.authorization || req.headers.Authorization;
    
    token = token.replace('Bearer ', '');

    return this.validateSession(token);
  }

  async validateSession(token) {
    const session = await this.sessionsRepository.findOne({
      where: {
          token,
          expires: MoreThan(new Date()),
      }
    });

    if (session) {
      await this.sessionsRepository.update(session.id, {expires: new Date(moment().add(1, 'days').format())});

      return true;
    }

    throw new UnauthorizedException(erroredResponse(401, {}, `Token de autorización invalido`));
  }
}
