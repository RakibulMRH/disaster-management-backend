// src/routes/auth.routes.ts
import { Router } from 'express';
import { register, login, test } from '../controllers/auth.controller';

const router = Router();

/**
 * @swagger
 * /auth/test:
 *   get:
 *     summary: Test the auth controller
 *     description: Returns a message indicating the auth controller is working
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Auth controller is working
 */
router.get('/test', test);
router.post('/register', register);
router.post('/login', login);

export default router;