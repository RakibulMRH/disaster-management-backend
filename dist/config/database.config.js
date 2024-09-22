"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Import your entity classes
const user_model_1 = require("../models/user.model");
const crisis_model_1 = require("../models/crisis.model");
const donation_model_1 = require("../models/donation.model");
const inventoryItem_model_1 = require("../models/inventoryItem.model");
const inventoryTransaction_model_1 = require("../models/inventoryTransaction.model");
const expense_model_1 = require("../models/expense.model");
const volunteerAssignmentLog_model_1 = require("../models/volunteerAssignmentLog.model");
const assignment_model_1 = require("../models/assignment.model");
// Load .env file
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'mrh',
    database: process.env.DB_DATABASE || 'disaster_management',
    synchronize: true,
    logging: false,
    entities: [user_model_1.User, crisis_model_1.Crisis, donation_model_1.Donation, inventoryItem_model_1.InventoryItem, inventoryTransaction_model_1.InventoryTransaction, expense_model_1.Expense, volunteerAssignmentLog_model_1.VolunteerAssignmentLog, assignment_model_1.Assignment], // Use the entity classes directly
    migrations: ['src/migrations/**/*.ts'],
    subscribers: ['src/subscribers/**/*.ts'],
});
