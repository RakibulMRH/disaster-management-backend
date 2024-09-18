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
exports.AdminService = void 0;
const database_config_1 = require("../config/database.config");
const user_model_1 = require("../models/user.model");
class AdminService {
    // Verify a user by ID
    static verifyUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = database_config_1.AppDataSource.getRepository(user_model_1.User);
            const user = yield userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error('User not found');
            }
            // Mark the user as verified
            user.isVerified = true;
            yield userRepository.save(user);
            return user;
        });
    }
    // Assign a role to a user (Admin, Volunteer, etc.)
    static assignRole(userId, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = database_config_1.AppDataSource.getRepository(user_model_1.User);
            const user = yield userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error('User not found');
            }
            // Assign the role
            user.role = role;
            yield userRepository.save(user);
            return user;
        });
    }
    // List all unverified users
    static listUnverifiedUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = database_config_1.AppDataSource.getRepository(user_model_1.User);
            const unverifiedUsers = yield userRepository.find({ where: { isVerified: false } });
            return unverifiedUsers;
        });
    }
}
exports.AdminService = AdminService;
