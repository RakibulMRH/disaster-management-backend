"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
// Middleware to check if the user has one of the allowed roles
const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (roles.includes(req.user.role)) {
            next(); // User has the required role, proceed
        }
        else {
            res.status(403).json({ message: 'Forbidden: You do not have the required role' });
        }
    };
};
exports.roleMiddleware = roleMiddleware;
