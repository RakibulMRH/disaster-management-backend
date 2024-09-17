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
// src/controllers/auth.controller.ts
const express_1 = require("express");
const auth_service_1 = require("../services/auth.service");
const user_dto_1 = require("../dtos/user.dto");
const login_dto_1 = require("../dtos/login.dto");
const class_validator_1 = require("class-validator");
const router = (0, express_1.Router)();
const authService = new auth_service_1.AuthService();
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createUserDto = new user_dto_1.CreateUserDto();
    Object.assign(createUserDto, req.body);
    const errors = yield (0, class_validator_1.validate)(createUserDto);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    try {
        const user = yield authService.register(createUserDto);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginDto = new login_dto_1.LoginDto();
    Object.assign(loginDto, req.body);
    const errors = yield (0, class_validator_1.validate)(loginDto);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    try {
        const token = yield authService.login(loginDto);
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
}));
router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Auth controller is working' });
});
exports.default = router;
