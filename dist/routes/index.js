"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.ts
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const admin_routes_1 = __importDefault(require("./admin.routes"));
//import userRoutes from './users.routes';
// Import other route modules as needed
/*import donationRoutes from './donations.routes';
import crisisRoutes from './crises.routes';
import inventoryRoutes from './inventory.routes';
import assignmentRoutes from './assignments.routes';
import reportRoutes from './reports.routes';*/
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/admin', admin_routes_1.default);
/*router.use('/users', userRoutes);
 router.use('/donations', donationRoutes);
router.use('/crises', crisisRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/assignments', assignmentRoutes);
router.use('/reports', reportRoutes);*/
// Add other routes, e.g., donations, crises, inventory, etc.
exports.default = router;
