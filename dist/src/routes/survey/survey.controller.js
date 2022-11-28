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
exports.SurveyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const survey_service_1 = require("./survey.service");
const survey_dto_1 = require("./survey.dto");
let SurveyController = class SurveyController {
    constructor(surveyService) {
        this.surveyService = surveyService;
    }
    async getSurveys(queryDTO, req, res) {
        const response = await this.surveyService.getSurveys(req, queryDTO);
        return res.status(response.status).json(response);
    }
    async getUserById(id, res) {
        const response = await this.surveyService.getSurveyById(id);
        return res.status(response.status).json(response);
    }
    async createSurvey(bodyDTO, res) {
        const response = await this.surveyService.createSurvey(bodyDTO);
        return res.status(response.status).json(response);
    }
    async putSurvey(id, bodyDTO, res) {
        const response = await this.surveyService.putSurvey(id, bodyDTO);
        return res.status(response.status).json(response);
    }
    async deleteSurvey(id, res) {
        const response = await this.surveyService.deleteSurvey(id);
        return res.status(response.status).json(response);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [survey_dto_1.GetSurveysDto, Object, Object]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "getSurveys", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [survey_dto_1.PostSurveysDto, Object]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "createSurvey", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, survey_dto_1.PostSurveysDto, Object]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "putSurvey", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "deleteSurvey", null);
SurveyController = __decorate([
    (0, swagger_1.ApiTags)('survey'),
    (0, common_1.Controller)('survey'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    __metadata("design:paramtypes", [survey_service_1.SurveyService])
], SurveyController);
exports.SurveyController = SurveyController;
//# sourceMappingURL=survey.controller.js.map