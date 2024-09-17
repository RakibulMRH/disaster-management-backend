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
exports.VolunteerAssignment = void 0;
// src/entities/volunteerAssignment.entity.ts
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const crisis_entity_1 = require("./crisis.entity");
let VolunteerAssignment = class VolunteerAssignment {
};
exports.VolunteerAssignment = VolunteerAssignment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], VolunteerAssignment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.assignments, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], VolunteerAssignment.prototype, "volunteer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => crisis_entity_1.Crisis, (crisis) => crisis, { nullable: true, onDelete: 'SET NULL' }),
    __metadata("design:type", crisis_entity_1.Crisis)
], VolunteerAssignment.prototype, "crisis", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], VolunteerAssignment.prototype, "taskDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VolunteerAssignment.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.assignedTasks, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], VolunteerAssignment.prototype, "assignedByAdmin", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], VolunteerAssignment.prototype, "dateAssigned", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'assigned' }),
    __metadata("design:type", String)
], VolunteerAssignment.prototype, "status", void 0);
exports.VolunteerAssignment = VolunteerAssignment = __decorate([
    (0, typeorm_1.Entity)()
], VolunteerAssignment);
