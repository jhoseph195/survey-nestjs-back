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
exports.AnswerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const answer_service_1 = require("./answer.service");
const answer_dto_1 = require("./answer.dto");
let AnswerController = class AnswerController {
    constructor(answerService) {
        this.answerService = answerService;
    }
    async getAnswers(queryDTO, req, res) {
        const response = await this.answerService.getAnswers(req, queryDTO);
        return res.status(response.status).json(response);
    }
    async getAnswerById(id, res) {
        const response = await this.answerService.getAnswerById(id);
        return res.status(response.status).json(response);
    }
    async createAnswer(bodyDTO, res) {
        const response = await this.answerService.createAnswer(bodyDTO);
        return res.status(response.status).json(response);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [answer_dto_1.GetAnswerDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "getAnswers", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "getAnswerById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [answer_dto_1.PostAnswerDto, Object]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "createAnswer", null);
AnswerController = __decorate([
    (0, swagger_1.ApiTags)('answer'),
    (0, common_1.Controller)('answer'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    __metadata("design:paramtypes", [answer_service_1.AnswerService])
], AnswerController);
exports.AnswerController = AnswerController;
//# sourceMappingURL=answer.controller.js.map