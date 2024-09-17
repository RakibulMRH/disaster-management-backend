// routes/index.ts
import { Router } from 'express';
import authRoutes from '../controllers/auth.controller';
import userRoutes from '../controllers/users.controller';
// Import other route modules as needed

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
// Add other routes, e.g., donations, crises, inventory, etc.

export default router;
