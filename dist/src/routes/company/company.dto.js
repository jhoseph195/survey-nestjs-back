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
exports.PostCompanysDto = exports.GetCompanysDto = exports.EOrigin = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("@nestjsi/class-validator");
const class_validator_2 = require("class-validator");
var EOrigin;
(function (EOrigin) {
    EOrigin["APP"] = "APP";
    EOrigin["WEB"] = "WEB";
})(EOrigin = exports.EOrigin || (exports.EOrigin = {}));
class GetCompanysDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], GetCompanysDto.prototype, "filter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_validator_2.IsNumber)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Number)
], GetCompanysDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_validator_2.IsNumber)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Number)
], GetCompanysDto.prototype, "page", void 0);
exports.GetCompanysDto = GetCompanysDto;
class PostCompanysDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_2.IsString)(),
    __metadata("design:type", String)
], PostCompanysDto.prototype, "socialReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_2.IsString)(),
    __metadata("design:type", String)
], PostCompanysDto.prototype, "business", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsEmailTidy)(),
    __metadata("design:type", String)
], PostCompanysDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_2.IsString)(),
    __metadata("design:type", String)
], PostCompanysDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_2.IsString)(),
    __metadata("design:type", String)
], PostCompanysDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_2.IsString)(),
    __metadata("design:type", String)
], PostCompanysDto.prototype, "neighborhood", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        maxLength: 5,
        minLength: 5,
    }),
    (0, class_validator_2.IsNumber)(),
    (0, class_validator_2.MinLength)(5),
    (0, class_validator_2.MaxLength)(5),
    __metadata("design:type", String)
], PostCompanysDto.prototype, "postalCode", void 0);
exports.PostCompanysDto = PostCompanysDto;
//# sourceMappingURL=company.dto.js.map