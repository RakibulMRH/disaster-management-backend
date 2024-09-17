"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/index.ts
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
// Import other route modules as needed
const router = (0, express_1.Router)();
router.use('/auth', auth_controller_1.default);
router.use('/users', users_controller_1.default);
// Add other routes, e.g., donations, crises, inventory, etc.
exports.default = router;
