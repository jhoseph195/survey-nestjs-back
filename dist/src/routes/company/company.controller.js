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
exports.CompanyController = void 0;
const common_1 = require("@nestjs/common");
const company_dto_1 = require("./company.dto");
const company_service_1 = require("./company.service");
const swagger_1 = require("@nestjs/swagger");
let CompanyController = class CompanyController {
    constructor(companyService) {
        this.companyService = companyService;
    }
    async getCompanys(queryDTO, req, res) {
        const response = await this.companyService.getCompanys(req, queryDTO);
        return res.status(response.status).json(response);
    }
    async getCompanyById(id, res) {
        const response = await this.companyService.getCompanyById(id);
        return res.status(response.status).json(response);
    }
    async createCompany(bodyDTO, res) {
        const response = await this.companyService.createCompany(bodyDTO);
        return res.status(response.status).json(response);
    }
    async putCompany(id, bodyDTO, res) {
        const response = await this.companyService.putCompany(id, bodyDTO);
        return res.status(response.status).json(response);
    }
    async deleteCompany(id, res) {
        const response = await this.companyService.deleteCompany(id);
        return res.status(response.status).json(response);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_dto_1.GetCompanysDto, Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getCompanys", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getCompanyById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_dto_1.PostCompanysDto, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "createCompany", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, company_dto_1.PostCompanysDto, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "putCompany", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "deleteCompany", null);
CompanyController = __decorate([
    (0, swagger_1.ApiTags)('company'),
    (0, common_1.Controller)('company'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    __metadata("design:paramtypes", [company_service_1.CompanyService])
], CompanyController);
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map