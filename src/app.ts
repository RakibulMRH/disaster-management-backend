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
app.use(morgan('dev'));

const expresss = require('express');
const paths = require('path'); 
 
// Enable CORS
app.use(cors({
  origin: 'http://localhost:4200',  // Allow requests from Angular frontend
  credentials: true,                // Allow credentials like cookies, headers
  methods: 'GET,POST,PUT,DELETE',   // Allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization'  // Allowed headers
}));


// Define the path to your uploads folder (outside the root project folder)
const uploadsPath = paths.resolve(__dirname, '../uploads');  // Adjust the path accordingly


// Serve static files from the "uploads" folder
app.use('/uploads', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
}, express.static(uploadsPath));

console.log(`Serving static files from: ${uploadsPath}`);


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