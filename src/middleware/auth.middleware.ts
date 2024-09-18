import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define a custom AuthenticatedRequest interface extending the default Request
export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    username: string;
    role: string;
  };
}

// Middleware to authenticate JWT tokens and attach user information to req.user
export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; username: string; role: string };
    req.user = decoded; // user defined in src/types/express/index.d.ts
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
