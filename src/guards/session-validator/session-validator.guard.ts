import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { erroredResponse } from '../../schemas/http-responses.interface';

@Injectable()
export class SessionValidatorGuard implements CanActivate {
  
  constructor(
    private readonly reflector: Reflector
  ) {}
  
  canActivate( context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
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

    if (token != req.sessionID) {
      throw new UnauthorizedException(erroredResponse(401, {}, `Token de autorización invalido`));
    }

    req.session.touch()

    return true;
  }
}
