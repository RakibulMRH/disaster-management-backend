"use strict";
// src/app.ts
/// <reference path="./types/express.d.ts" />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const database_config_1 = require("./config/database.config");
const swagger_config_1 = require("./config/swagger.config"); // Import the Swagger specs
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const error_middleware_1 = require("./middleware/error.middleware");
const role_middleware_1 = require("./middleware/role.middleware");
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
// Initialize Express
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
const expresss = require('express');
const paths = require('path');
// Enable CORS
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200', // Allow requests from Angular frontend
    credentials: true, // Allow credentials like cookies, headers
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization' // Allowed headers
}));
// Define the path to your uploads folder (outside the root project folder)
const uploadsPath = paths.resolve(__dirname, '../uploads'); // Adjust the path accordingly
// Serve static files from the "uploads" folder
app.use('/uploads', (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
}, express_1.default.static(uploadsPath));
console.log(`Serving static files from: ${uploadsPath}`);
// API Routes
app.use(routes_1.default);
// Swagger setup
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.swaggerSpecs));
// Error Handling Middleware
app.use(error_middleware_1.errorHandler);
// Role Middleware
app.use(role_middleware_1.roleMiddleware);
// Establish the database connection and start the server
database_config_1.AppDataSource.initialize()
    .then(() => {
    console.log('Database connection established');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error('TypeORM connection error:', error);
});
exports.default = app;
