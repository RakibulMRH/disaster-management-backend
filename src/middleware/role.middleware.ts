import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware'; 

// Middleware to check if the user has one of the allowed roles
export const roleMiddleware = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (roles.includes(req.user.role)) {
      next();  // User has the required role, proceed
    } else {
      res.status(403).json({ message: 'Forbidden: You do not have the required role' });
    }
  };
};
