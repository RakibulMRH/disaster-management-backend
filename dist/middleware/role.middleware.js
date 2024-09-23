"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const roleMiddleware = (roles) => {
    return (req, res, next) => {
        var _a;
        const userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role; // Assuming req.user is populated by authMiddleware
        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
