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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_config_1 = require("../config/database.config");
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = require("bcryptjs");
const nodemailer_1 = __importDefault(require("nodemailer"));
const typeorm_1 = require("typeorm");
class UserService {
    constructor() {
        this.userRepository = database_config_1.AppDataSource.getRepository(user_model_1.User);
    }
    // Create a new user
    createUser(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield (0, bcryptjs_1.hash)(createUserDto.password, 10); // Hashing password before storing
            const newUser = this.userRepository.create(Object.assign(Object.assign({}, createUserDto), { password: hashedPassword }));
            return yield this.userRepository.save(newUser);
        });
    }
    // Get a user by ID
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOne({ where: { id: userId } });
        });
    }
    // Update a user
    updateUser(userId, updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            if (updateUserDto.newPassword) {
                const { currentPassword, newPassword } = updateUserDto;
                // Check if current password is  
                if (!currentPassword) {
                    throw new Error('Current password is required to update the password');
                }
                const isSame = yield (0, bcryptjs_1.compare)(currentPassword, user.password);
                if (isSame) {
                    throw new Error('New password must be different from the current password');
                }
                // Compare current password with the stored password
                const isMatch = yield (0, bcryptjs_1.compare)(currentPassword, user.password);
                if (!isMatch) {
                    throw new Error('Current password is incorrect');
                }
                // Hash the new password
                user.password = yield (0, bcryptjs_1.hash)(newPassword, 10);
            }
            Object.assign(user, updateUserDto);
            return yield this.userRepository.save(user);
        });
    }
    // Delete a user
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            yield this.userRepository.remove(user);
        });
    }
    // Get all users
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.find();
        });
    }
    // Get all users by role
    getAllUsersByRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.find({ where: { role, isVerified: true } });
        });
    }
    // Method to generate and send reset PIN
    generateResetPin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { email } });
            if (!user) {
                throw new Error('User not found.');
            }
            const resetPin = Math.floor(100000 + Math.random() * 900000).toString();
            // Set PIN and expiration (e.g., 15 minutes)
            user.resetPasswordToken = resetPin;
            user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiration
            yield this.userRepository.save(user);
            // Send reset PIN via email
            yield this.sendResetPinEmail(user.email, resetPin);
        });
    }
    // Verify the PIN and reset the password using username or email
    resetPassword(pin, newPassword, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: [
                    { resetPasswordToken: pin, resetPasswordExpires: (0, typeorm_1.MoreThan)(new Date()), username: identifier },
                    { resetPasswordToken: pin, resetPasswordExpires: (0, typeorm_1.MoreThan)(new Date()), email: identifier }
                ],
            });
            if (!user) {
                throw new Error('Invalid or expired PIN or identifier.');
            }
            // Hash the new password before saving
            const hashedPassword = yield (0, bcryptjs_1.hash)(newPassword, 10);
            user.password = hashedPassword;
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;
            yield this.userRepository.save(user);
        });
    }
    // Send PIN via email using nodemailer
    sendResetPinEmail(email, pin) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: 'aiubsemester1@gmail.com',
                    pass: 'zpip miax heks pdnk',
                },
            });
            const mailOptions = {
                from: 'aiubsemester1@gmail.com',
                to: email,
                subject: 'Your Password Reset PIN',
                text: `Your password reset PIN is ${pin}. It will expire in 15 minutes.`,
            };
            yield transporter.sendMail(mailOptions);
        });
    }
    // Generate PIN and send email
    requestPasswordReset(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { email } });
            if (!user) {
                throw new Error('User with this email does not exist.');
            }
            // Generate a 6-digit PIN
            const resetPin = Math.floor(100000 + Math.random() * 900000).toString();
            // Set PIN and expiration (e.g., 15 minutes)
            user.resetPasswordToken = resetPin;
            user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiration
            yield this.userRepository.save(user);
            // Send reset PIN via email
            yield this.sendResetPinEmail(user.email, resetPin);
        });
    }
}
exports.UserService = UserService;
