import { Request, Response } from 'express';
import { AssignmentService } from '../services/assignments.service';
import { CreateAssignmentDto, UpdateAssignmentDto } from '../dtos/assignment.dto';

export class AssignmentController {
  private assignmentService: AssignmentService;

  constructor() {
    this.assignmentService = new AssignmentService();
    this.createAssignment = this.createAssignment.bind(this);
    this.updateAssignment = this.updateAssignment.bind(this);
    this.getAssignments = this.getAssignments.bind(this);
    this.deleteAssignment = this.deleteAssignment.bind(this);
    this.assignVolunteer = this.assignVolunteer.bind(this);
  }

   // Create a new assignment (Admin only)
   async createAssignment(req: Request, res: Response): Promise<Response> {
    try {
      const assignmentData: CreateAssignmentDto = req.body;
      const newAssignment = await this.assignmentService.createAssignment(assignmentData);
      return res.status(201).json({
        message: 'Assignment created successfully',
        assignment: newAssignment,
      });
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  // Assign a volunteer to an assignment
  async assignVolunteer(req: Request, res: Response): Promise<Response> {
    try {
      const assignmentId = parseInt(req.params.assignmentId, 10);
      const volunteerId = req.user!.id; // Assuming the user is authenticated
      const volunteerAssignment = await this.assignmentService.assignVolunteer(assignmentId, volunteerId);
      return res.status(200).json({
        message: 'Volunteer assigned successfully',
        volunteerAssignment,
      });
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  // Update an assignment (Admin only)
  async updateAssignment(req: Request, res: Response): Promise<Response> {
    try {
      const assignmentId = parseInt(req.params.id, 10);
      const assignmentData: UpdateAssignmentDto = req.body;
      const updatedAssignment = await this.assignmentService.updateAssignment(assignmentId, assignmentData);
      return res.status(200).json({
        message: 'Assignment updated successfully',
        assignment: updatedAssignment,
      });
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }

  // Get all assignments (Admin and Volunteer)
  async getAssignments(req: Request, res: Response): Promise<Response> {
    try {
      const assignments = await this.assignmentService.getAllAssignments();
      return res.status(200).json(assignments);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  // Delete an assignment (Admin only)
  async deleteAssignment(req: Request, res: Response): Promise<Response> {
    try {
      const assignmentId = parseInt(req.params.id, 10);
      await this.assignmentService.deleteAssignment(assignmentId);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }
}
