import 'reflect-metadata';
import { AppDataSource } from './data-source';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { setupSwagger } from './swagger'; // Import the Swagger setup function
import { errorHandler } from './middleware/error.middleware';
import authRouter from './controllers/auth.controller'; // Import the auth router
import path from 'path';

// Create a new Express application instance
const app = express();

// Middleware
app.use(express.json());  
app.use(cors());         
app.use(helmet());     
app.use(morgan('combined')); 

// Error Handling Middleware
app.use(errorHandler);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Establish the database connection and start the server
AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established');

    // API Routes
    const routes = require('./routes/route').default;
    app.use('/api', routes);
    app.use('/auth', authRouter);  

    // Setup Swagger
    setupSwagger(app);  

    app.listen(process.env.port, () => {
      console.log(`Server is running on port ${process.env.port}`);
    });
  })
  .catch((error) => {
    console.error('TypeORM connection error:', error);
  });

export default app;