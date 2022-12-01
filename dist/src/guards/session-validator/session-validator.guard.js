"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionValidatorGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const session_entity_1 = require("../../entities/session.entity");
const http_responses_interface_1 = require("../../schemas/http-responses.interface");
let SessionValidatorGuard = class SessionValidatorGuard {
    constructor(reflector, sessionsRepository) {
        this.reflector = reflector;
        this.sessionsRepository = sessionsRepository;
    }
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const isPublic = this.reflector.get("isPublic", context.getHandler());
        if (isPublic) {
            return true;
        }
        if (req.headers && !req.headers.authorization && !req.headers.Authorization) {
            throw new common_1.UnauthorizedException((0, http_responses_interface_1.erroredResponse)(401, {}, `No se encontro la cabecera 'Authorization'`));
        }
        let token = req.headers.authorization || req.headers.Authorization;
        token = token.replace('Bearer ', '');
        return this.validateSession(token);
    }
    async validateSession(token) {
        const session = await this.sessionsRepository.findOne({
            where: {
                token,
                expires: (0, typeorm_2.MoreThan)(new Date()),
            }
        });
        if (session) {
            await this.sessionsRepository.update(session.id, { expires: new Date(moment().add(1, 'days').format()) });
            return true;
        }
        throw new common_1.UnauthorizedException((0, http_responses_interface_1.erroredResponse)(401, {}, `Token de autorización invalido`));
    }
};
SessionValidatorGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(session_entity_1.Session)),
    __metadata("design:paramtypes", [core_1.Reflector,
        typeorm_2.Repository])
], SessionValidatorGuard);
exports.SessionValidatorGuard = SessionValidatorGuard;
//# sourceMappingURL=session-validator.guard.js.map