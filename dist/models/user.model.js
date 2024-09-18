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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const volunteerAssignment_model_1 = require("./volunteerAssignment.model");
const crisis_model_1 = require("./crisis.model");
const inventoryTransaction_model_1 = require("./inventoryTransaction.model");
const expense_model_1 = require("./expense.model");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, class_validator_1.IsEmail)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "dateJoined", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => volunteerAssignment_model_1.VolunteerAssignment, (assignment) => assignment.volunteer),
    __metadata("design:type", Array)
], User.prototype, "assignments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => volunteerAssignment_model_1.VolunteerAssignment, (assignment) => assignment.assignedByAdmin),
    __metadata("design:type", Array)
], User.prototype, "assignedTasks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => crisis_model_1.Crisis, (crisis) => crisis.reportedByUser),
    __metadata("design:type", Array)
], User.prototype, "reportedCrises", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => crisis_model_1.Crisis, (crisis) => crisis.approvedByAdmin),
    __metadata("design:type", Array)
], User.prototype, "approvedCrises", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inventoryTransaction_model_1.InventoryTransaction, (transaction) => transaction.user),
    __metadata("design:type", Array)
], User.prototype, "inventoryTransactions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => expense_model_1.Expense, (expense) => expense.user),
    __metadata("design:type", Array)
], User.prototype, "expenses", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['username', 'email'])
], User);
