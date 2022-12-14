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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const auth_dto_1 = require("./auth.dto");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../entities/user.entity");
const js_sha256_1 = require("js-sha256");
const http_responses_interface_1 = require("../../schemas/http-responses.interface");
const session_entity_1 = require("../../entities/session.entity");
const moment = require("moment");
let AuthService = class AuthService {
    constructor(usersRepository, sessionsRepository) {
        this.usersRepository = usersRepository;
        this.sessionsRepository = sessionsRepository;
    }
    async login(bodyDTO, request) {
        const user = await this.usersRepository.findOne({
            relations: {
                company: true,
            },
            where: {
                email: bodyDTO.email,
                password: (0, js_sha256_1.sha256)(bodyDTO.password),
                isDeleted: false
            }
        });
        if (user) {
            delete user.password;
            if ((bodyDTO.origin == auth_dto_1.EOrigin.WEB && user.type != user_entity_1.EType.CAPTURIST) || bodyDTO.origin == auth_dto_1.EOrigin.APP) {
                const token = (0, js_sha256_1.sha256)(request.sessionID);
                await this.sessionsRepository.insert({
                    token,
                    expires: new Date(moment().add(1, 'days').format()),
                    user: { id: user.id }
                });
                return (0, http_responses_interface_1.successResponse)(200, '??xito', Object.assign(Object.assign({}, user), { token }));
            }
            else {
                return (0, http_responses_interface_1.erroredResponse)(403, {}, 'No tienes los permisos necesarios para ingresar al sistema');
            }
        }
        return (0, http_responses_interface_1.erroredResponse)(403, {}, 'Credenciales incorrectas');
    }
    async logout(req) {
        let token = req.headers.authorization || req.headers.Authorization;
        token = token.replace('Bearer ', '');
        await this.sessionsRepository.delete({ token });
        return (0, http_responses_interface_1.successResponse)(200, '??xito', {});
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(session_entity_1.Session)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map