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
exports.AdminController = void 0;
const admin_service_1 = require("../services/admin.service");
const crisis_service_1 = require("../services/crisis.service");
class AdminController {
    constructor() {
        this.crisisService = new crisis_service_1.CrisisService();
    }
    // Verify a user by ID
    static verifyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id, 10);
                const verifiedUser = yield admin_service_1.AdminService.verifyUser(userId);
                return res.status(200).json({ message: 'User verified successfully', user: verifiedUser });
            }
            catch (error) {
                return res.status(404).json({ message: error.message });
            }
        });
    }
    // Assign a role to a user
    static assignRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, role } = req.body;
                const updatedUser = yield admin_service_1.AdminService.assignRole(userId, role);
                return res.status(200).json({ message: `Role ${role} assigned to user`, user: updatedUser });
            }
            catch (error) {
                return res.status(404).json({ message: error.message });
            }
        });
    }
    // List all unverified users
    static listUnverifiedUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const unverifiedUsers = yield admin_service_1.AdminService.listUnverifiedUsers();
                return res.status(200).json(unverifiedUsers);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    // Admin approves a crisis
    static approveCrisis(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const crisisId = parseInt(req.params.id, 10);
                const adminId = req.user.id; // Admin user ID from the request
                const crisisService = new crisis_service_1.CrisisService(); // Instantiate the service
                const approvedCrisis = yield crisisService.approveCrisis(crisisId, adminId);
                return res.status(200).json({
                    message: 'Crisis approved successfully',
                    crisis: approvedCrisis,
                });
            }
            catch (error) {
                return res.status(404).json({ message: error.message });
            }
        });
    }
    // Admin updates a crisis (approve or modify crisis details)
    static updateCrisis(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const crisisId = parseInt(req.params.id, 10);
                const crisisData = req.body;
                const crisisService = new crisis_service_1.CrisisService(); // Instantiate the service
                const updatedCrisis = yield crisisService.updateCrisis(crisisId, crisisData);
                return res.status(200).json({
                    message: 'Crisis updated successfully',
                    crisis: updatedCrisis,
                });
            }
            catch (error) {
                return res.status(404).json({ message: error.message });
            }
        });
    }
    // Admin deletes a crisis
    static deleteCrisis(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const crisisId = parseInt(req.params.id, 10);
                const crisisService = new crisis_service_1.CrisisService(); // Instantiate the service
                yield crisisService.deleteCrisis(crisisId);
                return res.status(204).send();
            }
            catch (error) {
                return res.status(404).json({ message: error.message });
            }
        });
    }
}
exports.AdminController = AdminController;
