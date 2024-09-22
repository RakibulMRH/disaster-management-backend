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
exports.AssignmentController = void 0;
const assignments_service_1 = require("../services/assignments.service");
class AssignmentController {
    constructor() {
        this.assignmentService = new assignments_service_1.AssignmentService();
        this.assignmentService = new assignments_service_1.AssignmentService();
        // Bind methods to ensure `this` context is correct
        this.createAssignment = this.createAssignment.bind(this);
        this.joinAssignment = this.joinAssignment.bind(this);
        this.deleteAssignment = this.deleteAssignment.bind(this);
        this.getAllRecruitingAssignments = this.getAllRecruitingAssignments.bind(this);
        this.getAllAssignmentsForAdmin = this.getAllAssignmentsForAdmin.bind(this);
        this.updateAssignmentStatus = this.updateAssignmentStatus.bind(this);
    }
    // Create an assignment
    createAssignment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createAssignmentDto = req.body;
                const assignment = yield this.assignmentService.createAssignment(createAssignmentDto);
                return res.status(201).json({
                    message: 'Assignment created successfully',
                    assignment,
                });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    // Volunteer joins an assignment
    joinAssignment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const assignmentId = parseInt(req.params.assignmentId, 10);
                const assignVolunteerDto = {
                    userId: req.user.id,
                    assignmentId,
                };
                const assignment = yield this.assignmentService.assignVolunteer(assignVolunteerDto);
                return res.status(200).json({
                    message: 'Volunteer assigned successfully',
                    assignment,
                });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    // Delete an assignment
    deleteAssignment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const assignmentId = parseInt(req.params.assignmentId, 10);
                yield this.assignmentService.deleteAssignment(assignmentId);
                return res.status(200).json({ message: 'Assignment deleted successfully' });
            }
            catch (error) {
                return res.status(404).json({ message: error.message });
            }
        });
    }
    // Get all recruiting assignments for volunteers
    getAllRecruitingAssignments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const assignments = yield this.assignmentService.getAllRecruitingAssignments();
                return res.status(200).json(assignments);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    // Get all assignments for admin
    getAllAssignmentsForAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const assignments = yield this.assignmentService.getAllAssignmentsForAdmin();
                return res.status(200).json(assignments);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    // Update assignment status
    updateAssignmentStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const assignmentId = parseInt(req.params.id, 10);
                const { status } = req.body;
                const assignment = yield this.assignmentService.updateAssignmentStatus(assignmentId, status);
                return res.status(200).json({
                    message: 'Assignment status updated successfully',
                    assignment,
                });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    // Assign volunteer as an admin
    assignVolunteer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const assignVolunteerDto = req.body;
                const assignment = yield this.assignmentService.assignVolunteer(assignVolunteerDto);
                return res.status(200).json({
                    message: 'Volunteer assigned successfully',
                    assignment,
                });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.AssignmentController = AssignmentController;
