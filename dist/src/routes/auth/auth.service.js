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
let AuthService = class AuthService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
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
        delete user.password;
        if (user) {
            if ((bodyDTO.origin == auth_dto_1.EOrigin.WEB && user.type != user_entity_1.EType.CAPTURIST) || bodyDTO.origin == auth_dto_1.EOrigin.APP) {
                request.session['user'] = user;
                request.session['origin'] = bodyDTO.origin;
                return (0, http_responses_interface_1.successResponse)(200, 'Éxito', { token: request.sessionID });
            }
            else {
                return (0, http_responses_interface_1.erroredResponse)(403, {}, 'No tienes los permisos necesarios para ingresar al sistema');
            }
        }
        return (0, http_responses_interface_1.erroredResponse)(403, {}, 'Credenciales incorrectas');
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map