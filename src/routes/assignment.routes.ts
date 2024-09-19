import { Router } from 'express';
import { AssignmentController } from '../controllers/assignments.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();
const assignmentController = new AssignmentController(); // Instantiate AssignmentController


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
 *               - taskDescription
 *               - crisisId
 *               - requiredVolunteers
 *             properties:
 *               taskDescription:
 *                 type: string
 *                 example: Distribute food supplies
 *               crisisId:
 *                 type: integer
 *                 example: 1
 *               location:
 *                 type: string
 *                 example: Dhaka
 *               requiredVolunteers:
 *                 type: integer
 *                 example: 5
 *               status:
 *                 type: string
 *                 example: assigned
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
 *                   example: Assignment created successfully
 *                 assignment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     taskDescription:
 *                       type: string
 *                       example: Distribute food supplies
 *                     crisisId:
 *                       type: integer
 *                       example: 1
 *                     location:
 *                       type: string
 *                       example: Dhaka
 *                     requiredVolunteers:
 *                       type: integer
 *                       example: 5
 *                     status:
 *                       type: string
 *                       example: assigned
 */

router.post('/', [authMiddleware, roleMiddleware(['Admin'])], assignmentController.createAssignment);

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
 *         schema:
 *           type: integer
 *         required: true
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
 *                   example: Volunteer assigned successfully
 *                 volunteerAssignment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     volunteerId:
 *                       type: integer
 *                       example: 5
 *                     assignmentId:
 *                       type: integer
 *                       example: 3
 *                     status:
 *                       type: string
 *                       example: active
 *       400:
 *         description: No more volunteers are needed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No more volunteers are needed for this assignment
 */

router.post('/:assignmentId/join', [authMiddleware, roleMiddleware(['Volunteer'])], assignmentController.assignVolunteer);

/**
 * @swagger
 * /assignments/{id}:
 *   patch:
 *     summary: Update an existing assignment
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The assignment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               volunteerId:
 *                 type: integer
 *                 example: 2
 *               taskDescription:
 *                 type: string
 *                 example: "Coordinate medical relief"
 *               status:
 *                 type: string
 *                 example: "in_progress"
 *     responses:
 *       200:
 *         description: Assignment updated successfully
 *       404:
 *         description: Assignment not found
 */
router.patch('/:id', [authMiddleware, roleMiddleware(['Admin'])], assignmentController.updateAssignment);

/**
 * @swagger
 * /assignments:
 *   get:
 *     summary: Get all assignments
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of assignments
 */
router.get('/', [authMiddleware, roleMiddleware(['Admin', 'Volunteer'])], assignmentController.getAssignments);

/**
 * @swagger
 * /assignments/{id}:
 *   delete:
 *     summary: Delete an assignment
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The assignment ID
 *     responses:
 *       204:
 *         description: Assignment deleted successfully
 *       404:
 *         description: Assignment not found
 */
router.delete('/:id', [authMiddleware, roleMiddleware(['Admin'])], assignmentController.deleteAssignment);

export default router;