// Extend the Express Request interface to include a user property
declare namespace Express {
    export interface Request {
      user?: {
        id: number;
        username: string;
        role: string;
      };
    }
  }
  