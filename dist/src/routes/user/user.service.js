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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../entities/user.entity");
const http_responses_interface_1 = require("../../schemas/http-responses.interface");
const user_dto_1 = require("./user.dto");
const js_sha256_1 = require("js-sha256");
let UserService = class UserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
        this.createUSerIfNotExist();
    }
    async createUSerIfNotExist() {
        const user = await this.usersRepository.findOneBy({ id: 1 });
        if (!user) {
            await this.usersRepository.insert({
                "id": 1,
                "name": "Super Admin Survey",
                "email": "admin@survey.com",
                "password": "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",
                "type": user_entity_1.EType.SUPER_ADMIN,
                "company": { "id": 1 },
                "isDeleted": false,
            });
        }
        else {
            await this.usersRepository.update(1, {
                "name": "Super Admin Survey",
                "email": "admin@survey.com",
                "password": "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",
                "type": user_entity_1.EType.SUPER_ADMIN,
                "company": { "id": 1 },
                "isDeleted": false,
            });
        }
    }
    async getUsers(req, queryDTO) {
        const filters = {
            relations: {
                company: true,
            },
            where: {}
        };
        const filtersCount = { where: {} };
        const where = { isDeleted: false };
        if (queryDTO.companyId) {
            where.company = { id: queryDTO.companyId };
        }
        if (req.session['user'] && req.session['user'].type != user_entity_1.EType.SUPER_ADMIN) {
            where.company = { id: req.session['user'].company.id };
        }
        if (queryDTO.filter) {
            const tempFilters = [];
            tempFilters.push(Object.assign(Object.assign({}, where), { name: (0, typeorm_2.Like)(`%${queryDTO.filter}%`) }));
            tempFilters.push(Object.assign(Object.assign({}, where), { email: (0, typeorm_2.Like)(`%${queryDTO.filter}%`) }));
            filters.where = tempFilters;
            filtersCount.where = tempFilters;
        }
        else {
            filters.where = where;
            filtersCount.where = where;
        }
        if (queryDTO.limit) {
            filters.take = queryDTO.limit;
            if (queryDTO.page) {
                filters.skip = ((queryDTO.limit * queryDTO.page) - queryDTO.limit);
            }
        }
        const response = await this.usersRepository.find(filters);
        const responseCount = await this.usersRepository.count(filtersCount);
        return (0, http_responses_interface_1.successResponse)(200, 'Éxito', response, responseCount);
    }
    async getUserById(id) {
        const response = await this.usersRepository.findOne({
            relations: {
                company: true,
            },
            where: {
                id,
                isDeleted: false
            }
        });
        return (0, http_responses_interface_1.successResponse)(200, 'Éxito', response);
    }
    async createUser(bodyDTO) {
        const data = Object.assign(Object.assign({}, bodyDTO), { company: { id: bodyDTO.companyId } });
        data.password = (0, js_sha256_1.sha256)(bodyDTO.password);
        const response = await this.usersRepository.insert(data);
        return (0, http_responses_interface_1.successResponse)(200, 'Éxito', response);
    }
    async putUser(id, bodyDTO) {
        const data = Object.assign(Object.assign({}, bodyDTO), { company: { id: bodyDTO.companyId } });
        delete data.companyId;
        if (bodyDTO.password && bodyDTO.password.trim() != '') {
            data.password = (0, js_sha256_1.sha256)(bodyDTO.password);
        }
        if (bodyDTO.password && bodyDTO.password.trim() == '') {
            delete data.password;
        }
        console.log(data);
        const response = await this.usersRepository.update(id, data);
        return (0, http_responses_interface_1.successResponse)(200, 'Éxito', response);
    }
    async deleteUser(id) {
        const response = await this.usersRepository.update(id, { isDeleted: true });
        return (0, http_responses_interface_1.successResponse)(200, 'Éxito', response);
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.GetUsersDto]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "getUsers", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.PostUsersDto]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "createUser", null);
__decorate([
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dto_1.PostUsersDto]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "putUser", null);
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map