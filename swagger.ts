// swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Disaster Management API',
      version: '1.0.0',
      description: 'API documentation for the Disaster Management Backend',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Update this to your server URL
      },
    ],
  },
  apis: ['./controllers/*.ts', './dtos/*.ts'], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};