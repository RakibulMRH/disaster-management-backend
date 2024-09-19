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
exports.login = exports.register = void 0;
const class_validator_1 = require("class-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_service_1 = require("../services/auth.service");
const user_dto_1 = require("../dtos/user.dto"); // Import DTO
const login_dto_1 = require("../dtos/login.dto"); // Import DTO
// Register function
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const createUserDto = new user_dto_1.CreateUserDto();
    createUserDto.username = body.username;
    createUserDto.password = body.password;
    createUserDto.name = body.name;
    createUserDto.email = body.email; // Optional fields
    createUserDto.phoneNumber = body.phoneNumber; // Optional fields
    createUserDto.age = body.age; // Optional fields
    // Validate the DTO
    const errors = yield (0, class_validator_1.validate)(createUserDto);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    // Check if username or email already exists
    const existingUser = yield auth_service_1.AuthService.findByUsernameOrEmail(createUserDto.username);
    if (existingUser) {
        return res.status(400).json({ message: 'Username or email already in use' });
    }
    // Hash the password
    const hashedPassword = yield bcryptjs_1.default.hash(createUserDto.password, 10);
    // Create new user
    const newUser = yield auth_service_1.AuthService.createUser({
        username: createUserDto.username,
        password: hashedPassword,
        name: createUserDto.name,
        email: createUserDto.email,
        phoneNumber: createUserDto.phoneNumber,
        age: createUserDto.age,
        role: 'Volunteer', // Default role, you can modify this based on your logic
    });
    return res.status(201).json({ message: 'User registered successfully', newUser });
});
exports.register = register;
// Login function
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const loginDto = new login_dto_1.LoginDto();
    loginDto.usernameOrEmail = body.usernameOrEmail;
    loginDto.password = body.password;
    // Validate the login DTO
    const errors = yield (0, class_validator_1.validate)(loginDto);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    // Find the user by username or email
    const user = yield auth_service_1.AuthService.findByUsernameOrEmail(loginDto.usernameOrEmail);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    // Validate the password
    const isPasswordValid = yield auth_service_1.AuthService.validatePassword(loginDto.password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Generate JWT token
    const token = auth_service_1.AuthService.generateJwt(user);
    return res.status(200).json({ message: 'Login successful', token });
});
exports.login = login;
