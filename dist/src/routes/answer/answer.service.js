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
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const answer_entity_1 = require("../../entities/answer.entity");
const answer_dto_1 = require("./answer.dto");
const http_responses_interface_1 = require("../../schemas/http-responses.interface");
let AnswerService = class AnswerService {
    constructor(answersRepository) {
        this.answersRepository = answersRepository;
    }
    async getAnswers(req, queryDTO) {
        const filters = {
            relations: [
                'survey',
                'user',
                'survey.company'
            ],
            where: {}
        };
        const filtersCount = { where: {} };
        const where = { isDeleted: false };
        if (queryDTO.surveyId) {
            where.survey = { id: queryDTO.surveyId };
        }
        if (queryDTO.filter) {
            const tempFilters = [];
            tempFilters.push(Object.assign(Object.assign({}, where), { survey: { title: (0, typeorm_2.Like)(`%${queryDTO.filter}%`) } }));
            tempFilters.push(Object.assign(Object.assign({}, where), { survey: { description: (0, typeorm_2.Like)(`%${queryDTO.filter}%`) } }));
            tempFilters.push(Object.assign(Object.assign({}, where), { user: { name: (0, typeorm_2.Like)(`%${queryDTO.filter}%`) } }));
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
        const response = await this.answersRepository.find(filters);
        const responseCount = await this.answersRepository.count(filtersCount);
        return (0, http_responses_interface_1.successResponse)(200, 'Éxito', response, responseCount);
    }
    async getAnswerById(id) {
        const response = await this.answersRepository.findOne({
            relations: [
                'survey',
                'user',
                'survey.company'
            ],
            where: {
                id,
                isDeleted: false
            }
        });
        return (0, http_responses_interface_1.successResponse)(200, 'Éxito', response);
    }
    async createAnswer(bodyDTO) {
        const data = Object.assign(Object.assign({}, bodyDTO), { survey: { id: bodyDTO.surveyId }, user: { id: bodyDTO.userId } });
        delete data.surveyId;
        const response = await this.answersRepository.insert(Object.assign({}, bodyDTO));
        return (0, http_responses_interface_1.successResponse)(200, 'Éxito', response);
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, answer_dto_1.GetAnswerDto]),
    __metadata("design:returntype", Promise)
], AnswerService.prototype, "getAnswers", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [answer_dto_1.PostAnswerDto]),
    __metadata("design:returntype", Promise)
], AnswerService.prototype, "createAnswer", null);
AnswerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(answer_entity_1.Answer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AnswerService);
exports.AnswerService = AnswerService;
//# sourceMappingURL=answer.service.js.map