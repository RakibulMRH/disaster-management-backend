import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';

// Import your entity classes
import { User } from '../models/user.model';
import { Crisis } from '../models/crisis.model';
import { Donation } from '../models/donation.model';
import { InventoryItem } from '../models/inventoryItem.model';
import { InventoryTransaction } from '../models/inventoryTransaction.model';
import { Expense } from '../models/expense.model';
import { VolunteerAssignment } from '../models/volunteerAssignment.model';
import { Assignment } from '../models/assignment.model';

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'mrh',
  database: process.env.DB_DATABASE || 'disaster_management',
  synchronize: true,  
  logging: false,
  entities: [User, Crisis, Donation, InventoryItem, InventoryTransaction, Expense, VolunteerAssignment, Assignment], // Use the entity classes directly
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
});
