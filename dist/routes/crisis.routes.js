"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crisis_controller_1 = require("../controllers/crisis.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Crises
 *   description: Crisis management for anonymous and authenticated users
 */
/**
 * @swagger
 * /crises:
 *   get:
 *     summary: Get all approved crises (Anonymous access)
 *     tags: [Crises]
 *     responses:
 *       200:
 *         description: A list of approved crises
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
 *                   title:
 *                     type: string
 *                     example: 'Flood in Region X'
 *                   description:
 *                     type: string
 *                     example: 'Heavy flooding has affected the entire region.'
 *                   location:
 *                     type: string
 *                     example: 'Region X'
 *                   severity:
 *                     type: string
 *                     example: 'high'
 *                   requiredHelp:
 *                     type: string
 *                     example: 'Medical assistance and food supplies'
 *                   status:
 *                     type: string
 *                     example: 'approved'
 *                   dateReported:
 *                     type: string
 *                     format: date-time
 *                     example: '2024-09-19T04:38:53.485Z'
 */
router.get('/', crisis_controller_1.CrisisController.listCrises);
/**
 * @swagger
 * /crises:
 *   post:
 *     summary: Create a new crisis (Anonymous access)
 *     tags: [Crises]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - severity
 *             properties:
 *               title:
 *                 type: string
 *                 example: 'Flood in Region X'
 *               description:
 *                 type: string
 *                 example: 'Heavy flooding has affected the entire region.'
 *               location:
 *                 type: string
 *                 example: 'Region X'
 *               severity:
 *                 type: string
 *                 example: 'high'
 *               requiredHelp:
 *                 type: string
 *                 example: 'Medical assistance and food supplies'
 *     responses:
 *       201:
 *         description: Crisis created successfully (pending approval)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Crisis created successfully. Pending approval from admin.'
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
 *                       example: 'pending'
 */
router.post('/', crisis_controller_1.CrisisController.createCrisis);
exports.default = router;
