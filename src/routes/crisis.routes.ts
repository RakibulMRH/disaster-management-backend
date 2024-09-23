import { Router } from 'express';
import { CrisisController } from '../controllers/crisis.controller'; // Correct import
import { roleMiddleware } from '@/middleware/role.middleware';
import { Request, Response } from 'express';
import  { authMiddleware } from '@/middleware/auth.middleware';

const crisisController = new CrisisController(); // Instantiate CrisisController

const router = Router();

/**
 * @swagger
 * /crises:
 *   get:
 *     summary: Get a list of all approved crises
 *     tags: [Crises]
 *     responses:
 *       200:
 *         description: List of crises
 */
router.get('/', (req, res) => crisisController.listCrises(req, res));

/**
 * @swagger
 * /crises/pending:
 *   get:
 *     summary: Get a list of all pending crises
 *     tags: [Crises]
 *     responses:
 *       200:
 *         description: List of pending crises
 */

router.get('/pending', (req, res) => crisisController.listPendingCrises(req, res));

/**
 * @swagger
 * /crises:
 *   post:
 *     summary: Create a new crisis (with optional image)
 *     tags: [Crises]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - severity
 *               - goal
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the crisis
 *               description:
 *                 type: string
 *                 description: Description of the crisis
 *               location:
 *                 type: string
 *                 description: Location of the crisis
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image of the crisis
 *               severity:
 *                 type: string
 *                 enum: [low, medium, high, critical]
 *                 description: Severity level of the crisis
 *               requiredHelp:
 *                 type: string
 *                 description: Type of help required
 *               goal:
 *                 type: number
 *                 description: Goal amount for the crisis
 *     responses:
 *       201:
 *         description: Crisis created successfully (pending approval)
 */
router.post('/', crisisController.createCrisis);

/**
 * @swagger
 * /crises/{id}:
 *   put:
 *     summary: Update a crisis (Admin only)
 *     tags: [Crises]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Crisis ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Crisis updated successfully
 */
 
router.put('/:id', [authMiddleware, roleMiddleware(['Admin'])], (req: Request, res: Response) => crisisController.updateCrisis(req, res));

/**
 * @swagger
 * /crises/{id}:
 *   delete:
 *     summary: Delete a crisis (Admin only)
 *     tags: [Crises]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Crisis ID
 *     responses:
 *       204:
 *         description: Crisis deleted successfully
 */
router.delete('/:id', [ authMiddleware, roleMiddleware(['Admin'])], (req: Request, res: Response) => crisisController.deleteCrisis(req, res));

export default router;
