"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const admin_routes_1 = __importDefault(require("./admin.routes"));
const crisis_routes_1 = __importDefault(require("./crisis.routes"));
const donation_routes_1 = __importDefault(require("./donation.routes"));
const inventory_routes_1 = __importDefault(require("./inventory.routes"));
const users_routes_1 = __importDefault(require("./users.routes"));
const assignment_routes_1 = __importDefault(require("./assignment.routes"));
const report_routes_1 = __importDefault(require("./report.routes"));
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/admin', admin_routes_1.default);
router.use('/crises', crisis_routes_1.default);
router.use('/donations', donation_routes_1.default);
router.use('/inventory', inventory_routes_1.default);
router.use('/users', users_routes_1.default);
router.use('/assignments', assignment_routes_1.default);
router.use('/reports', report_routes_1.default);
exports.default = router;
