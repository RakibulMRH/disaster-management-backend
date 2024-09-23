"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const donations_controller_1 = require("../controllers/donations.controller"); // Import the controller
const donationController = new donations_controller_1.DonationController(); // Instantiate the controller
const router = (0, express_1.Router)();
/**
 * @swagger
 * /donations:
 *   post:
 *     summary: Make a donation to a specific crisis
 *     tags: [Donations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - donorName
 *               - amount
 *               - crisisId
 *             properties:
 *               donorName:
 *                 type: string
 *                 description: Name of the donor
 *                 example: 'John Doe'
 *               amount:
 *                 type: number
 *                 description: Amount donated
 *                 example: 100
 *               crisisId:
 *                 type: integer
 *                 description: ID of the crisis to donate to
 *                 example: 1
 *               notes:
 *                 type: string
 *                 description: Optional notes from the donor
 *                 example: 'For relief efforts'
 *     responses:
 *       201:
 *         description: Donation successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Donation successful'
 *                 donation:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     donorName:
 *                       type: string
 *                       example: 'John Doe'
 *                     amount:
 *                       type: number
 *                       example: 100
 *                     crisisId:
 *                       type: integer
 *                       example: 1
 *                     dateDonated:
 *                       type: string
 *                       format: date-time
 *                       example: '2024-09-19T12:34:56Z'
 */
router.post('/', (req, res) => donationController.createDonation(req, res));
/**
 * @swagger
 * /donations/total-fund/{crisisId}:
 *   get:
 *     summary: Get the total fund amount for a specific crisis
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: crisisId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the crisis
 *     responses:
 *       200:
 *         description: The total fund amount for the crisis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalFund:
 *                   type: number
 *                   example: 5000
 */
router.get('/total-fund/:crisisId', (req, res) => donationController.getTotalFund(req, res));
/**
 * @swagger
 * /donations/list/{crisisId}:
 *   get:
 *     summary: Get a list of all donations for a specific crisis
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: crisisId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the crisis
 *     responses:
 *       200:
 *         description: List of all donations for the crisis
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
 *                   donorName:
 *                     type: string
 *                     example: 'John Doe'
 *                   amount:
 *                     type: number
 *                     example: 100
 *                   crisisId:
 *                     type: integer
 *                     example: 1
 *                   dateDonated:
 *                     type: string
 *                     format: date-time
 *                     example: '2024-09-19T12:34:56Z'
 */
router.get('/list/:crisisId', (req, res) => donationController.getAllDonations(req, res));
/**
 * @swagger
 * /donations/total:
 *   get:
 *     summary: Get all donations funds for all crises
 *     tags: [Donations]
 *     responses:
 *       200:
 *         description: List of all donations funds for all crises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   crisisId:
 *                     type: integer
 *                     example: 1
 *                   totalFund:
 *                     type: number
 *                     example: 5000
 */
router.get('/total', (req, res) => donationController.getAllDonationsFunds(req, res));
/**
 * @swagger
 * /donations/all:
 *   get:
 *     summary: Get all donations list for all crises
 *     tags: [Donations]
 *     responses:
 *       200:
 *         description: List of all donations for all crises
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
 *                   donorName:
 *                     type: string
 *                     example: 'John Doe'
 *                   amount:
 *                     type: number
 *                     example: 100
 *                   crisisId:
 *                     type: integer
 *                     example: 1
 *                   dateDonated:
 *                     type: string
 *                     format: date-time
 *                     example: '2024-09-19T12:34:56Z'
 */
router.get('/all', (req, res) => donationController.getAllDonationsList(req, res));
exports.default = router;
