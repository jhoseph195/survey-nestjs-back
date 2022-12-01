import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { Session } from '../../entities/session.entity';
export declare class SessionValidatorGuard implements CanActivate {
    private readonly reflector;
    private sessionsRepository;
    constructor(reflector: Reflector, sessionsRepository: Repository<Session>);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    validateSession(token: any): Promise<boolean>;
}
