"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpecs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Disaster Management API',
        version: '1.0.0',
        description: 'APIs for disaster management system',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            bearerAuth: [], // Apply JWT to all routes
        },
    ],
};
const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts', './src/docs/**/*.ts'], // Paths to the API docs (can include models and controllers if needed)
};
exports.swaggerSpecs = (0, swagger_jsdoc_1.default)(options);
