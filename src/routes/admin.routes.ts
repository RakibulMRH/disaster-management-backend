import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management
 */

/**
 * @swagger
 * /admin/verify-user/{id}:
 *   put:
 *     summary: Verify a user
 *     description: Admin can verify a user by their ID
 *     tags: [Admin]
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'User verified successfully'
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: 'john_doe'
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
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               role:
 *                 type: string
 *                 example: 'Volunteer'
 *     responses:
 *       200:
 *         description: Role assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Role assigned to user'
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: 'john_doe'
 *                     role:
 *                       type: string
 *                       example: 'Volunteer'
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
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: A list of unverified users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   username:
 *                     type: string
 *                     example: 'john_doe'
 *                   isVerified:
 *                     type: boolean
 *                     example: false
 */
router.get('/unverified-users', [authMiddleware, roleMiddleware(['Admin'])], AdminController.listUnverifiedUsers);

/**
 * @swagger
 * /admin/crises/{id}/approve:
 *   put:
 *     summary: Approve a crisis (Admin only)
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the crisis to approve
 *     responses:
 *       200:
 *         description: Crisis approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Crisis approved successfully'
 *                 crisis:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: 'Flood in Region X'
 *                     status:
 *                       type: string
 *                       example: 'approved'
 *                     approvedByAdmin:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 2
 *                         username:
 *                           type: string
 *                           example: 'adminUser'
 *                     dateApproved:
 *                       type: string
 *                       format: date-time
 *                       example: '2024-09-19T04:38:53.485Z'
 */
router.put('/crises/:id/approve', [authMiddleware, roleMiddleware(['Admin'])], AdminController.approveCrisis);

/**
 * @swagger
 * /admin/crises/{id}:
 *   put:
 *     summary: Update a crisis (Admin only)
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the crisis to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: 'Flood in Region Y'
 *               severity:
 *                 type: string
 *                 example: 'medium'
 *               status:
 *                 type: string
 *                 example: 'pending'
 *     responses:
 *       200:
 *         description: Crisis updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Crisis updated successfully'
 *                 crisis:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: 'Flood in Region Y'
 *                     status:
 *                       type: string
 *                       example: 'pending'
 */
router.put('/crises/:id', [authMiddleware, roleMiddleware(['Admin'])], AdminController.updateCrisis);

/**
 * @swagger
 * /admin/crises/{id}:
 *   delete:
 *     summary: Delete a crisis (Admin only)
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the crisis to delete
 *     responses:
 *       204:
 *         description: Crisis deleted successfully
 */
router.delete('/crises/:id', [authMiddleware, roleMiddleware(['Admin'])], AdminController.deleteCrisis);

export default router;