"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentService = void 0;
// src/services/assignment.service.ts
const database_config_1 = require("../config/database.config");
const assignment_model_1 = require("../models/assignment.model");
const volunteerAssignmentLog_model_1 = require("../models/volunteerAssignmentLog.model");
const user_model_1 = require("../models/user.model");
class AssignmentService {
    constructor() {
        this.assignmentRepository = database_config_1.AppDataSource.getRepository(assignment_model_1.Assignment);
        this.volunteerLogRepository = database_config_1.AppDataSource.getRepository(volunteerAssignmentLog_model_1.VolunteerAssignmentLog);
        this.userRepository = database_config_1.AppDataSource.getRepository(user_model_1.User);
    }
    // Create a new assignment
    createAssignment(createAssignmentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const assignment = this.assignmentRepository.create(Object.assign(Object.assign({}, createAssignmentDto), { assignedVolunteers: 0, createdAt: new Date(), status: 'recruiting' }));
            return yield this.assignmentRepository.save(assignment);
        });
    }
    // Volunteer joins an assignment
    assignVolunteer(assignVolunteerDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const assignment = yield this.assignmentRepository.findOneBy({
                id: assignVolunteerDto.assignmentId,
            });
            if (!assignment)
                throw new Error('Assignment not found');
            if (assignment.assignedVolunteers >= assignment.requiredVolunteers) {
                throw new Error('No more volunteers needed for this assignment');
            }
            // Check if the user status is "unassigned"
            const user = yield this.userRepository.findOneBy({ id: assignVolunteerDto.userId });
            if (!user)
                throw new Error('User not found');
            if (user.status !== 'unassigned') {
                throw new Error('User is not available for assignment');
            }
            const volunteerLog = this.volunteerLogRepository.create({
                user: user,
                assignment: assignment,
                assignedAt: new Date(),
            });
            yield this.volunteerLogRepository.save(volunteerLog);
            // Update the number of assigned volunteers
            assignment.assignedVolunteers += 1;
            // Update the status if the required number of volunteers is met
            if (assignment.assignedVolunteers >= assignment.requiredVolunteers) {
                assignment.status = 'active';
            }
            yield this.assignmentRepository.save(assignment);
            return assignment;
        });
    }
    // Delete an assignment
    deleteAssignment(assignmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const assignment = yield this.assignmentRepository.findOne({ where: { id: assignmentId } });
            if (!assignment)
                throw new Error('Assignment not found');
            yield this.assignmentRepository.remove(assignment);
        });
    }
    // Get all assignments for volunteers
    getAllRecruitingAssignments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.assignmentRepository.find({ where: { status: 'recruiting' } });
        });
    }
    // Get all assignments for admin
    getAllAssignmentsForAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const assignments = yield this.assignmentRepository.find();
            return assignments.sort((a, b) => {
                const statusOrder = ['recruiting', 'active', 'completed', 'cancelled'];
                return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
            });
        });
    }
    // Update assignment status
    updateAssignmentStatus(assignmentId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const assignment = yield this.assignmentRepository.findOne({ where: { id: assignmentId } });
            if (!assignment)
                throw new Error('Assignment not found');
            assignment.status = status;
            return yield this.assignmentRepository.save(assignment);
        });
    }
}
exports.AssignmentService = AssignmentService;
