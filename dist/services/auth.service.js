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
exports.AuthService = void 0;
const database_config_1 = require("../config/database.config");
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    // Function to create a new user
    static createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = database_config_1.AppDataSource.getRepository(user_model_1.User);
            // Create new user instance
            const newUser = userRepository.create(userData);
            // Save user to the database
            yield userRepository.save(newUser);
            return newUser;
        });
    }
    // Function to validate password
    static validatePassword(password, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcryptjs_1.default.compare(password, hash);
        });
    }
    // Function to generate a JWT token
    static generateJwt(user) {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        const payload = {
            id: user.id,
            username: user.username,
            role: user.role,
        };
        const options = {
            expiresIn: '1h',
            algorithm: 'HS256'
        };
        return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, options);
    }
    // Function to find a user by username or email
    static findByUsernameOrEmail(usernameOrEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = database_config_1.AppDataSource.getRepository(user_model_1.User);
            return userRepository.findOne({
                where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
            });
        });
    }
}
exports.AuthService = AuthService;
