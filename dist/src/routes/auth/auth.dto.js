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
exports.PostLoginDto = exports.EOrigin = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("@nestjsi/class-validator");
const class_validator_2 = require("class-validator");
var EOrigin;
(function (EOrigin) {
    EOrigin["APP"] = "APP";
    EOrigin["WEB"] = "WEB";
})(EOrigin = exports.EOrigin || (exports.EOrigin = {}));
class PostLoginDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_2.IsString)(),
    (0, class_validator_1.IsEmailTidy)(),
    __metadata("design:type", String)
], PostLoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, minLength: 8 }),
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.MinLength)(8),
    __metadata("design:type", String)
], PostLoginDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: EOrigin }),
    (0, class_validator_2.IsEnum)(EOrigin),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], PostLoginDto.prototype, "origin", void 0);
exports.PostLoginDto = PostLoginDto;
//# sourceMappingURL=auth.dto.js.map