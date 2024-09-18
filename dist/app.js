"use strict";
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
const auth_controller_1 = __importDefault(require("./controllers/auth.controller")); // Import the auth router
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
// Initialize Express
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('combined'));
// API Routes
const routes = require('../routes/index').default;
app.use('/api', routes);
app.use('/auth', auth_controller_1.default);
// Swagger setup
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.swaggerSpecs));
// Error Handling Middleware
app.use(error_middleware_1.errorHandler);
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
