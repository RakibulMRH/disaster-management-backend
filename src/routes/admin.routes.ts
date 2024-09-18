import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();

/**
 * @swagger
 * /admin/verify-user/{id}:
 *   put:
 *     summary: Verify a user
 *     description: Admin can verify a user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to verify
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User verified successfully
 *       404:
 *         description: User not found
 */
router.put('/verify-user/:id', [authMiddleware, roleMiddleware(['Admin'])], AdminController.verifyUser);

/**
 * @swagger
 * /admin/assign-role:
 *   post:
 *     summary: Assign a role to a user
 *     description: Admin can assign roles like Admin or Volunteer to users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - role
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               role:
 *                 type: string
 *                 example: Volunteer
 *     responses:
 *       200:
 *         description: Role assigned successfully
 *       404:
 *         description: User not found
 */
router.post('/assign-role', [authMiddleware, roleMiddleware(['Admin'])], AdminController.assignRole);

/**
 * @swagger
 * /admin/unverified-users:
 *   get:
 *     summary: Get all unverified users
 *     description: Admin can fetch a list of all users who are not verified yet
 *     responses:
 *       200:
 *         description: A list of unverified users
 */
router.get('/unverified-users', [authMiddleware, roleMiddleware(['Admin'])], AdminController.listUnverifiedUsers);

export default router;