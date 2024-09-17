"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const env_1 = require("./env");
const swagger_1 = require("./swagger"); // Import the Swagger setup function
const error_middleware_1 = require("./middleware/error.middleware");
// Create a new Express application instance
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('combined'));
// Error Handling Middleware
app.use(error_middleware_1.errorHandler);
// TypeORM DataSource configuration
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: env_1.env.dbHost,
    port: env_1.env.dbPort,
    username: env_1.env.dbUsername,
    password: env_1.env.dbPassword,
    database: env_1.env.dbDatabase,
    synchronize: true, //  false in production
    logging: false,
    entities: ['dist/entities/**/*.js'],
    migrations: ['dist/migrations/**/*.js'],
    subscribers: ['dist/subscribers/**/*.js'],
});
// Establish the database connection and start the server
exports.AppDataSource.initialize()
    .then(() => {
    console.log('Database connection established');
    // API Routes
    const routes = require('./routes').default;
    app.use('/api', routes);
    // Setup Swagger
    (0, swagger_1.setupSwagger)(app); // Setup Swagger documentation
    app.listen(env_1.env.port, () => {
        console.log(`Server is running on port ${env_1.env.port}`);
    });
})
    .catch((error) => {
    console.error('TypeORM connection error:', error);
});
