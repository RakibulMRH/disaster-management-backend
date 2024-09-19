// src/types/express.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: number;
        username: string;
        role: string;
      };
    }
  }
}