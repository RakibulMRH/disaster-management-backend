import { Router } from 'express';
import { InventoryController } from '../controllers/inventory.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();
const inventoryController = new InventoryController();

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Inventory management for relief supplies.
 */

/**
 * @swagger
 * /inventory/items:
 *   post:
 *     summary: Add a new inventory item
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - quantity
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Water Bottles"
 *               type:
 *                 type: string
 *                 example: "Relief"
 *               quantity:
 *                 type: number
 *                 example: 150
 *               description:
 *                 type: string
 *                 example: "Pack of donated water bottles"
 *     responses:
 *       201:
 *         description: Inventory item added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Inventory item created successfully"
 *                 item:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Water Bottles"
 *                     type:
 *                       type: string
 *                       example: "Relief"
 *                     quantity:
 *                       type: number
 *                       example: 150
 *                     description:
 *                       type: string
 *                       example: "Pack of donated water bottles"
 *       400:
 *         description: Bad request, validation error
 *       403:
 *         description: Forbidden (for unauthorized users)
 */
router.post('/items', [authMiddleware, roleMiddleware(['Admin', 'Volunteer'])], inventoryController.createItem);

/**
 * @swagger
 * /inventory/transactions:
 *   post:
 *     summary: Record an inventory transaction
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemId
 *               - transactionType
 *               - quantity
 *               - cost
 *             properties:
 *               itemId:
 *                 type: integer
 *                 example: 1
 *               transactionType:
 *                 type: string
 *                 example: "purchase"
 *               quantity:
 *                 type: number
 *                 example: 100
 *               cost:
 *                 type: number
 *                 example: 300.50
 *               notes:
 *                 type: string
 *                 example: "Purchased emergency water supply"
 *     responses:
 *       201:
 *         description: Inventory transaction recorded successfully and expense logged
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 101
 *                 itemId:
 *                   type: integer
 *                   example: 1
 *                 transactionType:
 *                   type: string
 *                   example: "purchase"
 *                 quantity:
 *                   type: number
 *                   example: 100
 *                 cost:
 *                   type: number
 *                   example: 300.50
 *                 notes:
 *                   type: string
 *                   example: "Purchased emergency water supply"
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-09-20T12:34:56Z"
 *       400:
 *         description: Bad request or validation error
 *       403:
 *         description: Forbidden (if the user doesn't have the correct role)
 */
router.post('/transactions', [authMiddleware, roleMiddleware(['Admin', 'Volunteer'])], inventoryController.recordTransaction);

/**
 * @swagger
 * /inventory/list:
 *   get:
 *     summary: Get list of all inventory items
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of inventory items
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
 *                   name:
 *                     type: string
 *                     example: "Water Bottles"
 *                   type:
 *                     type: string
 *                     example: "Relief"
 *                   quantity:
 *                     type: number
 *                     example: 100
 *                   description:
 *                     type: string
 *                     example: "Pack of donated water bottles"
 *       403:
 *         description: Forbidden (if the user doesn't have the correct role)
 */
router.get('/list', [authMiddleware, roleMiddleware(['Admin', 'Volunteer'])], inventoryController.getInventoryList);

/**
 * @swagger
 * /inventory/items/{id}:
 *   delete:
 *     summary: Delete an inventory item
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Inventory item deleted successfully
 *       404:
 *         description: Item not found
 *       403:
 *         description: Forbidden (if unauthorized)
 */
router.delete('/items/:id', [authMiddleware, roleMiddleware(['Admin'])], inventoryController.deleteItem);

/**
 * @swagger
 * /inventory/items/{id}:
 *   patch:
 *     summary: Update an inventory item
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Rice"
 *               type:
 *                 type: string
 *                 example: "Relief"
 *               quantity:
 *                 type: number
 *                 example: 100
 *               description:
 *                 type: string
 *                 example: "A batch of donated rice"
 *     responses:
 *       200:
 *         description: Inventory item updated successfully
 *       404:
 *         description: Item not found
 *       403:
 *         description: Forbidden (if unauthorized)
 */
router.patch('/items/:id', [authMiddleware, roleMiddleware(['Admin'])], inventoryController.updateItem);

export default router;