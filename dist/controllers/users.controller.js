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
exports.UserController = void 0;
const users_service_1 = require("../services/users.service");
const class_validator_1 = require("class-validator");
class UserController {
    constructor() {
        // Register a new user (Admin)
        this.registerUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.user;
                if (!currentUser) {
                    return res.status(401).json({ message: 'User not authenticated' });
                }
                // Only admin can register new users
                if (currentUser.role !== 'Admin') {
                    return res.status(403).json({ message: 'You are not authorized to register new users' });
                }
                const createUserDto = req.body;
                // Validate input data
                const errors = yield (0, class_validator_1.validate)(createUserDto);
                if (errors.length > 0) {
                    return res.status(400).json(errors);
                }
                const newUser = yield this.userService.createUser(createUserDto);
                return res.status(201).json(newUser);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
        // Get a user by ID 
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id);
                const user = yield this.userService.getUserById(userId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                return res.status(200).json(user);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
        // Update user details (only admin or the user can update)
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id);
                const updateUserDto = req.body;
                const currentUser = req.user;
                if (!currentUser) {
                    return res.status(401).json({ message: 'User not authenticated' });
                }
                // Only allow update if the user is admin or the same user
                if (currentUser.role !== 'Admin' && currentUser.id !== userId) {
                    return res.status(403).json({ message: 'You are not authorized to update this user' });
                }
                const updatedUser = yield this.userService.updateUser(userId, updateUserDto);
                if (!updatedUser) {
                    return res.status(404).json({ message: 'User not found' });
                }
                return res.status(200).json(updatedUser);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
        // Delete a user (only admin can delete)
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id);
                const currentUser = req.user;
                if (!currentUser) {
                    return res.status(401).json({ message: 'User not authenticated' });
                }
                // Only allow delete if the user is admin
                if (currentUser.role !== 'Admin') {
                    return res.status(403).json({ message: 'You are not authorized to delete this user' });
                }
                yield this.userService.deleteUser(userId);
                return res.status(204).json({ message: 'User deleted successfully' });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
        // Get all users (admin action)
        this.getAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.user;
                if (!currentUser) {
                    return res.status(401).json({ message: 'User not authenticated' });
                }
                // Only admin can view all users
                if (currentUser.role !== 'Admin') {
                    return res.status(403).json({ message: 'You are not authorized to view all users' });
                }
                const users = yield this.userService.getAllUsers();
                return res.status(200).json(users);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
        //get all user by role
        this.getAllUsersByRole = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.user;
                const role = req.params.role;
                const users = yield this.userService.getAllUsersByRole(role);
                return res.status(200).json(users);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
        this.userService = new users_service_1.UserService();
        this.registerUser = this.registerUser.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.getAllUsersByRole = this.getAllUsersByRole.bind(this);
        this.requestPasswordReset = this.requestPasswordReset.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
    }
    // Request password reset and send PIN via email
    requestPasswordReset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                yield this.userService.requestPasswordReset(email);
                return res.status(200).json({ message: 'Password reset PIN sent to your email.' });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    // Reset the password using PIN, username or email
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { pin, newPassword, identifier } = req.body; // identifier can be either username or email
                yield this.userService.resetPassword(pin, newPassword, identifier);
                return res.status(200).json({ message: 'Password has been reset successfully.' });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.UserController = UserController;
