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
exports.SurveyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const survey_entity_1 = require("../../entities/survey.entity");
const user_entity_1 = require("../../entities/user.entity");
const http_responses_interface_1 = require("../../schemas/http-responses.interface");
const survey_dto_1 = require("./survey.dto");
let SurveyService = class SurveyService {
    constructor(surveysRepository) {
        this.surveysRepository = surveysRepository;
    }
    async getSurveys(req, queryDTO) {
        const filters = {
            relations: {
                company: true,
            },
            where: {}
        };
        const filtersCount = { where: {} };
        const where = { isDeleted: false };
        if (req.session['user'] && req.session['user'].type != user_entity_1.EType.SUPER_ADMIN) {
            where.id = req.session['user'].company.id;
        }
        if (queryDTO.filter) {
            const tempFilters = [];
            tempFilters.push({ isDeleted: false, title: (0, typeorm_2.Like)(`%${queryDTO.filter}%`) });
            tempFilters.push({ isDeleted: false, description: (0, typeorm_2.Like)(`%${queryDTO.filter}%`) });
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
        const response = await this.surveysRepository.find(filters);
        const responseCount = await this.surveysRepository.count(filtersCount);
        return (0, http_responses_interface_1.successResponse)(200, 'Éxito', response, responseCount);
    }
    async getSurveyById(id) {
        const response = await this.surveysRepository.findOne({
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
    async createSurvey(bodyDTO) {
        const response = await this.surveysRepository.insert(Object.assign({}, bodyDTO));
        return (0, http_responses_interface_1.successResponse)(200, 'Éxito', response);
    }
    async putSurvey(id, bodyDTO) {
        const response = await this.surveysRepository.update(id, Object.assign({}, bodyDTO));
        return (0, http_responses_interface_1.successResponse)(200, 'Éxito', response);
    }
    async deleteSurvey(id) {
        const response = await this.surveysRepository.update(id, { isDeleted: true });
        return (0, http_responses_interface_1.successResponse)(200, 'Éxito', response);
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, survey_dto_1.GetSurveysDto]),
    __metadata("design:returntype", Promise)
], SurveyService.prototype, "getSurveys", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [survey_dto_1.PostSurveysDto]),
    __metadata("design:returntype", Promise)
], SurveyService.prototype, "createSurvey", null);
__decorate([
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, survey_dto_1.PostSurveysDto]),
    __metadata("design:returntype", Promise)
], SurveyService.prototype, "putSurvey", null);
SurveyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(survey_entity_1.Survey)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SurveyService);
exports.SurveyService = SurveyService;
//# sourceMappingURL=survey.service.js.map