"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crisis_controller_1 = require("../controllers/crisis.controller"); // Correct import
const crisisController = new crisis_controller_1.CrisisController(); // Instantiate CrisisController
const router = (0, express_1.Router)();
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
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - severity
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
 *               imageUrl:
 *                 type: string
 *                 format: binary
 *                 description: Image URL of the crisis
 *               severity:
 *                 type: string
 *                 enum: [low, medium, high, critical]
 *                 description: Severity level of the crisis
 *               requiredHelp:
 *                 type: string
 *                 description: Type of help required
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
exports.default = router;
