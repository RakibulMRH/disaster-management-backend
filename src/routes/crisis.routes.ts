import { Router } from 'express';
import { CrisisController } from '../controllers/crisis.controller'; // Correct import

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
 * /crises:
 *   post:
 *     summary: Create a new crisis (with optional image)
 *     tags: [Crises]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               severity:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
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
router.put('/:id', (req, res) => crisisController.updateCrisis(req, res));

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
router.delete('/:id', (req, res) => crisisController.deleteCrisis(req, res));

export default router;
