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
exports.VolunteerAssignmentLog = void 0;
// src/models/volunteerAssignment.model.ts
const typeorm_1 = require("typeorm");
const user_model_1 = require("./user.model");
const assignment_model_1 = require("./assignment.model");
let VolunteerAssignmentLog = class VolunteerAssignmentLog {
};
exports.VolunteerAssignmentLog = VolunteerAssignmentLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], VolunteerAssignmentLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.assignments),
    __metadata("design:type", user_model_1.User)
], VolunteerAssignmentLog.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => assignment_model_1.Assignment, (assignment) => assignment.volunteerAssignments),
    __metadata("design:type", assignment_model_1.Assignment)
], VolunteerAssignmentLog.prototype, "assignment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], VolunteerAssignmentLog.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], VolunteerAssignmentLog.prototype, "assignedAt", void 0);
exports.VolunteerAssignmentLog = VolunteerAssignmentLog = __decorate([
    (0, typeorm_1.Entity)()
], VolunteerAssignmentLog);
