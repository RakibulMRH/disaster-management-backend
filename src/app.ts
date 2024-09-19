// src/app.ts
/// <reference path="./types/express.d.ts" />

import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { AppDataSource } from './config/database.config';
import { swaggerSpecs } from './config/swagger.config'; // Import the Swagger specs
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middleware/error.middleware';
import routes from './routes'; 

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

// API Routes
app.use(routes); 

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Error Handling Middleware
app.use(errorHandler);

// Establish the database connection and start the server
AppDataSource.initialize()
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

export default app;