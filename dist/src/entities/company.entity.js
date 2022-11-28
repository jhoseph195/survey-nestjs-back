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
exports.Company = void 0;
const typeorm_1 = require("typeorm");
let Company = class Company {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Company.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Company.prototype, "socialReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Company.prototype, "business", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], Company.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10 }),
    __metadata("design:type", String)
], Company.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Company.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], Company.prototype, "neighborhood", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 5 }),
    __metadata("design:type", String)
], Company.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Company.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Company.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Company.prototype, "updatedAt", void 0);
Company = __decorate([
    (0, typeorm_1.Entity)()
], Company);
exports.Company = Company;
//# sourceMappingURL=company.entity.js.map