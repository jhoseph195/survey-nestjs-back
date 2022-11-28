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
exports.PostUsersDto = exports.GetUsersDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("@nestjsi/class-validator");
const class_validator_2 = require("class-validator");
const user_entity_1 = require("../../entities/user.entity");
class GetUsersDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_validator_2.IsNumber)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Number)
], GetUsersDto.prototype, "companyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], GetUsersDto.prototype, "filter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_validator_2.IsNumber)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Number)
], GetUsersDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_validator_2.IsNumber)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Number)
], GetUsersDto.prototype, "page", void 0);
exports.GetUsersDto = GetUsersDto;
class PostUsersDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_2.IsString)(),
    __metadata("design:type", String)
], PostUsersDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsEmailTidy)(),
    __metadata("design:type", String)
], PostUsersDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        minLength: 1,
    }),
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.MinLength)(1),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], PostUsersDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        enum: user_entity_1.EType,
    }),
    (0, class_validator_2.IsEnum)(user_entity_1.EType),
    __metadata("design:type", String)
], PostUsersDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_2.IsNumber)(),
    __metadata("design:type", Number)
], PostUsersDto.prototype, "companyId", void 0);
exports.PostUsersDto = PostUsersDto;
//# sourceMappingURL=user.dto.js.map