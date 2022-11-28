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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionValidatorGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const http_responses_interface_1 = require("../../schemas/http-responses.interface");
let SessionValidatorGuard = class SessionValidatorGuard {
    constructor(reflector) {
        this.reflector = reflector;
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
        if (token != req.sessionID) {
            throw new common_1.UnauthorizedException((0, http_responses_interface_1.erroredResponse)(401, {}, `Token de autorización invalido`));
        }
        req.session.touch();
        return true;
    }
};
SessionValidatorGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], SessionValidatorGuard);
exports.SessionValidatorGuard = SessionValidatorGuard;
//# sourceMappingURL=session-validator.guard.js.map