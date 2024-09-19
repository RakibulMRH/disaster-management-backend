// src/routes/index.ts
import { Router } from 'express';
import authRoutes from './auth.routes';
import adminRoutes from './admin.routes';
import crisisRoutes from './crisis.routes';
import donationRoutes from './donation.routes';
//import userRoutes from './users.routes';
// Import other route modules as needed

/*import donationRoutes from './donations.routes';
import crisisRoutes from './crises.routes';
import inventoryRoutes from './inventory.routes';
import assignmentRoutes from './assignments.routes';
import reportRoutes from './reports.routes';*/

const router = Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/crises', crisisRoutes);
router.use('/donations', donationRoutes);
/*router.use('/users', userRoutes); 
router.use('/crises', crisisRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/assignments', assignmentRoutes);
router.use('/reports', reportRoutes);*/

// Add other routes, e.g., donations, crises, inventory, etc.

export default router;