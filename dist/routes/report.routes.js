"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reports_controller_1 = require("../controllers/reports.controller");
const auth_middleware_1 = require("../middleware/auth.middleware"); // Assuming authMiddleware is defined
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
const reportController = new reports_controller_1.ReportController();
// GET /reports/donations?startDate=2024-09-19&endDate=2024-09-19
/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Admin Reports API
 */
/**
 * @swagger
 * /reports/donations:
 *   get:
 *     summary: Generate and export custom donation report
 *     tags: [Reports]
 *     parameters:
 *       - name: startDate
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the report
 *       - name: endDate
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for the report
 *     responses:
 *       200:
 *         description: CSV file with donation report
 *       400:
 *         description: Bad request
 */
router.get('/donations', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['Admin']), reportController.generateCustomDonationReport);
/**
 * @swagger
 * /reports/expenses:
 *   get:
 *     summary: Generate and export custom expense report
 *     tags: [Reports]
 *     parameters:
 *       - name: startDate
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the report
 *       - name: endDate
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for the report
 *     responses:
 *       200:
 *         description: CSV file with expense report
 *       400:
 *         description: Bad request
 */
router.get('/expenses', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['Admin']), reportController.generateCustomExpenseReport);
/**
 * @swagger
 * /reports/inventory:
 *   get:
 *     summary: Generate and export custom inventory report
 *     tags: [Reports]
 *     parameters:
 *       - name: startDate
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the report
 *       - name: endDate
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for the report
 *     responses:
 *       200:
 *         description: CSV file with inventory report
 *       400:
 *         description: Bad request
 */
router.get('/inventory', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['Admin']), reportController.generateCustomInventoryReport);
/**
 * @swagger
 * /reports/daily-funds-expenses:
 *   get:
 *     summary: Get daily funds and expenses for the chart
 *     tags: [Reports]
 *     parameters:
 *       - name: startDate
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the report (optional)
 *       - name: endDate
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for the report (optional)
 *     responses:
 *       200:
 *         description: Chart data showing daily funds and expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date
 *                   totalFunds:
 *                     type: number
 *                   totalExpenses:
 *                     type: number
 */
router.get('/daily-funds-expenses', reportController.getDailyFundsAndExpenses);
exports.default = router;
