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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const company_entity_1 = require("../../entities/company.entity");
const http_responses_interface_1 = require("../../schemas/http-responses.interface");
const company_dto_1 = require("./company.dto");
const user_entity_1 = require("../../entities/user.entity");
let CompanyService = class CompanyService {
    constructor(companysRepository) {
        this.companysRepository = companysRepository;
        this.createCompanyIfNotExist();
    }
    async createCompanyIfNotExist() {
        const company = await this.companysRepository.findOneBy({ id: 1 });
        if (!company) {
            await this.companysRepository.insert({
                "id": 1,
                "socialReason": "Survey SA de CV",
                "business": "Tecnologías de la Información",
                "email": "contacto@survey.com",
                "phone": "3311223344",
                "address": "COLON NO. 182 NO. B",
                "neighborhood": "CENTRO, Jal",
                "postalCode": "49000",
                "isDeleted": false,
            });
        }
        else {
            await this.companysRepository.update(1, {
                "socialReason": "Survey SA de CV",
                "business": "Tecnologías de la Información",
                "email": "contacto@survey.com",
                "phone": "3311223344",
                "address": "COLON NO. 182 NO. B",
                "neighborhood": "CENTRO, Jal",
                "postalCode": "49000",
                "isDeleted": false
            });
        }
    }
    async getCompanys(req, queryDTO) {
        const filters = {
            where: {}
        };
        const filtersCount = { where: {} };
        const where = { isDeleted: false };
        if (req.session['user'] && req.session['user'].type != user_entity_1.EType.SUPER_ADMIN) {
            where.id = req.session['user'].company.id;
        }
        if (queryDTO.filter) {
            const tempFilters = [];
            tempFilters.push(Object.assign(Object.assign({}, where), { socialReason: (0, typeorm_2.Like)(`%${queryDTO.filter}%`) }));
            tempFilters.push(Object.assign(Object.assign({}, where), { business: (0, typeorm_2.Like)(`%${queryDTO.filter}%`) }));
            tempFilters.push(Object.assign(Object.assign({}, where), { email: (0, typeorm_2.Like)(`%${queryDTO.filter}%`) }));
            tempFilters.push(Object.assign(Object.assign({}, where), { phone: (0, typeorm_2.Like)(`%${queryDTO.filter}%`) }));
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
        const response = await this.companysRepository.find(filters);
        const responseCount = await this.companysRepository.count(filtersCount);
        return (0, http_responses_interface_1.successResponse)(200, 'Éxito', response, responseCount);
    }
    async getCompanyById(id) {
        const response = await this.companysRepository.findOne({
            where: {
                id,
                isDeleted: false
            }
        });
        return (0, http_responses_interface_1.successResponse)(200, 'Éxito', response);
    }
    async createCompany(bodyDTO) {
        const response = await this.companysRepository.insert(Object.assign({}, bodyDTO));
        return (0, http_responses_interface_1.successResponse)(200, 'Éxito', response);
    }
    async putCompany(id, bodyDTO) {
        const response = await this.companysRepository.update(id, Object.assign({}, bodyDTO));
        return (0, http_responses_interface_1.successResponse)(200, 'Éxito', response);
    }
    async deleteCompany(id) {
        const response = await this.companysRepository.update(id, { isDeleted: true });
        return (0, http_responses_interface_1.successResponse)(200, 'Éxito', response);
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, company_dto_1.GetCompanysDto]),
    __metadata("design:returntype", Promise)
], CompanyService.prototype, "getCompanys", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_dto_1.PostCompanysDto]),
    __metadata("design:returntype", Promise)
], CompanyService.prototype, "createCompany", null);
__decorate([
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, company_dto_1.PostCompanysDto]),
    __metadata("design:returntype", Promise)
], CompanyService.prototype, "putCompany", null);
CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompanyService);
exports.CompanyService = CompanyService;
//# sourceMappingURL=company.service.js.map