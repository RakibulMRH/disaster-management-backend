// src/controllers/assignment.controller.ts
import { Request, Response } from 'express';
import { AssignmentService } from '../services/assignments.service';
import { AssignVolunteerDto, CreateAssignmentDto } from '../dtos/assignment.dto';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export class AssignmentController {
  private assignmentService = new AssignmentService();

  constructor() {
    this.assignmentService = new AssignmentService();

    // Bind methods to ensure `this` context is correct
    this.createAssignment = this.createAssignment.bind(this);
    this.joinAssignment = this.joinAssignment.bind(this);
    this.deleteAssignment = this.deleteAssignment.bind(this);
    this.getAllRecruitingAssignments = this.getAllRecruitingAssignments.bind(this);
    this.getAllAssignmentsForAdmin = this.getAllAssignmentsForAdmin.bind(this);
    this.updateAssignmentStatus = this.updateAssignmentStatus.bind(this);
  }

  // Create an assignment
  async createAssignment(req: Request, res: Response) {
    try {
      const createAssignmentDto: CreateAssignmentDto = req.body;
      const assignment = await this.assignmentService.createAssignment(createAssignmentDto);
      return res.status(201).json({
        message: 'Assignment created successfully',
        assignment,
      });
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  // Volunteer joins an assignment
  async joinAssignment(req: AuthenticatedRequest, res: Response) {
    try {
      const assignmentId = parseInt(req.params.assignmentId, 10);
      const assignVolunteerDto: AssignVolunteerDto = {
        userId: req.user!.id,
        assignmentId,
      };
      const assignment = await this.assignmentService.assignVolunteer(assignVolunteerDto);
      return res.status(200).json({
        message: 'Volunteer assigned successfully',
        assignment,
      });
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  // Delete an assignment
  async deleteAssignment(req: Request, res: Response) {
    try {
      const assignmentId = parseInt(req.params.assignmentId, 10);
      await this.assignmentService.deleteAssignment(assignmentId);
      return res.status(200).json({ message: 'Assignment deleted successfully' });
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }

  // Get all recruiting assignments for volunteers
  async getAllRecruitingAssignments(req: Request, res: Response) {
    try {
      const assignments = await this.assignmentService.getAllRecruitingAssignments();
      return res.status(200).json(assignments);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  // Get all assignments for admin
  async getAllAssignmentsForAdmin(req: Request, res: Response) {
    try {
      const assignments = await this.assignmentService.getAllAssignmentsForAdmin();
      return res.status(200).json(assignments);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  // Update assignment status
  async updateAssignmentStatus(req: Request, res: Response) {
    try {
      const assignmentId = parseInt(req.params.id, 10);
      const { status } = req.body;
      const assignment = await this.assignmentService.updateAssignmentStatus(assignmentId, status);
      return res.status(200).json({
        message: 'Assignment status updated successfully',
        assignment,
      });
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  // Assign volunteer as an admin
  async assignVolunteer(req: Request, res: Response) {
    try {
      const assignVolunteerDto: AssignVolunteerDto = req.body;
      const assignment = await this.assignmentService.assignVolunteer(assignVolunteerDto);
      return res.status(200).json({
        message: 'Volunteer assigned successfully',
        assignment,
      });
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }
}