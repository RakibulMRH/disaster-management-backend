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
const user_entity_1 = require("../entities/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = require("../app"); // Import the existing DataSource
class AuthService {
    constructor() {
        if (!app_1.AppDataSource.isInitialized) {
            throw new Error('DataSource is not initialized');
        }
        this.userRepository = app_1.AppDataSource.getRepository(user_entity_1.User);
    }
    register(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, username, password, email, phoneNumber, age } = createUserDto;
            const existingUser = yield this.userRepository.findOne({ where: { username } });
            if (existingUser) {
                throw new Error('Username already exists');
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = this.userRepository.create({
                name,
                username,
                password: hashedPassword,
                email,
                phoneNumber,
                age,
                role: 'volunteer',
            });
            return this.userRepository.save(user);
        });
    }
    login(loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = loginDto;
            const user = yield this.userRepository.findOne({ where: { username } });
            if (!user) {
                throw new Error('Invalid credentials');
            }
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }
            const payload = { id: user.id, role: user.role };
            const secret = process.env.JWT_SECRET || 'your_jwt_secret';
            const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '1d' });
            return token;
        });
    }
}
exports.AuthService = AuthService;
