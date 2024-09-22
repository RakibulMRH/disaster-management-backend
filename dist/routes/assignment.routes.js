"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/assignment.routes.ts
const express_1 = require("express");
const assignments_controller_1 = require("../controllers/assignments.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
const assignmentController = new assignments_controller_1.AssignmentController();
/**
 * @swagger
 * tags:
 *   name: Assignments
 *   description: Managing assignments and volunteer participation
 */
/**
 * @swagger
 * /assignments:
 *   post:
 *     summary: Create a new assignment
 *     tags: [Assignments]
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
 *               - description
 *               - requiredVolunteers
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Disaster Relief"
 *               description:
 *                 type: string
 *                 example: "Provide support for flood victims"
 *               requiredVolunteers:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Assignment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Assignment created successfully"
 *                 assignment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Disaster Relief"
 *                     description:
 *                       type: string
 *                       example: "Provide support for flood victims"
 *                     requiredVolunteers:
 *                       type: integer
 *                       example: 10
 *                     assignedVolunteers:
 *                       type: integer
 *                       example: 0
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     status:
 *                       type: string
 *                       example: "recruiting"
 */
router.post('/', [auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['Admin'])], assignmentController.createAssignment);
/**
 * @swagger
 * /assignments/{assignmentId}/join:
 *   post:
 *     summary: Join an assignment as a volunteer
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The assignment ID
 *     responses:
 *       200:
 *         description: Volunteer assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Volunteer assigned successfully"
 *                 assignment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Disaster Relief"
 *                     description:
 *                       type: string
 *                       example: "Provide support for flood victims"
 *                     requiredVolunteers:
 *                       type: integer
 *                       example: 10
 *                     assignedVolunteers:
 *                       type: integer
 *                       example: 1
 *                     status:
 *                       type: string
 *                       example: "recruiting"
 *       400:
 *         description: No more volunteers are needed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No more volunteers are needed"
 */
router.post('/:assignmentId/join', [auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['Volunteer'])], assignmentController.joinAssignment);
/**
 * @swagger
 * /assignments/{assignmentId}:
 *   delete:
 *     summary: Delete an assignment
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The assignment ID
 *     responses:
 *       200:
 *         description: Assignment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Assignment deleted successfully"
 *       404:
 *         description: Assignment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Assignment not found"
 */
router.delete('/:assignmentId', [auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['Admin'])], assignmentController.deleteAssignment);
/**
 * @swagger
 * /assignments/recruiting:
 *   get:
 *     summary: Get all recruiting assignments for volunteers
 *     tags: [Assignments]
 *     responses:
 *       200:
 *         description: List of recruiting assignments
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
 *                     example: "Disaster Relief"
 *                   description:
 *                     type: string
 *                     example: "Provide support for flood victims"
 *                   requiredVolunteers:
 *                     type: integer
 *                     example: 10
 *                   assignedVolunteers:
 *                     type: integer
 *                     example: 5
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 *                     example: "recruiting"
 */
router.get('/recruiting', auth_middleware_1.authMiddleware, assignmentController.getAllRecruitingAssignments);
/**
 * @swagger
 * /assignments/admin:
 *   get:
 *     summary: Get all assignments for admin
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of assignments
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
 *                     example: "Disaster Relief"
 *                   description:
 *                     type: string
 *                     example: "Provide support for flood victims"
 *                   requiredVolunteers:
 *                     type: integer
 *                     example: 10
 *                   assignedVolunteers:
 *                     type: integer
 *                     example: 5
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 *                     example: "recruiting"
 */
router.get('/admin', [auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['Admin'])], assignmentController.getAllAssignmentsForAdmin);
/**
 * @swagger
 * /assignments/{id}/status:
 *   put:
 *     summary: Update assignment status
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The assignment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "active"
 *     responses:
 *       200:
 *         description: Assignment status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Assignment status updated successfully"
 *                 assignment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Disaster Relief"
 *                     description:
 *                       type: string
 *                       example: "Provide support for flood victims"
 *                     requiredVolunteers:
 *                       type: integer
 *                       example: 10
 *                     assignedVolunteers:
 *                       type: integer
 *                       example: 5
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     status:
 *                       type: string
 *                       example: "active"
 */
router.put('/:id/status', [auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['Admin'])], assignmentController.updateAssignmentStatus);
exports.default = router;
