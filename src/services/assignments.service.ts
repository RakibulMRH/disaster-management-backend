// src/services/assignment.service.ts
import { AppDataSource } from '../config/database.config';
import { Assignment } from '../models/assignment.model';
import { VolunteerAssignmentLog } from '../models/volunteerAssignmentLog.model';
import { AssignVolunteerDto, CreateAssignmentDto } from '../dtos/assignment.dto';
import { User } from '../models/user.model';

export class AssignmentService {
  private assignmentRepository = AppDataSource.getRepository(Assignment);
  private volunteerLogRepository = AppDataSource.getRepository(VolunteerAssignmentLog);
  private userRepository = AppDataSource.getRepository(User);

  // Create a new assignment
  async createAssignment(createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    const assignment = this.assignmentRepository.create({
      ...createAssignmentDto,
      assignedVolunteers: 0,
      createdAt: new Date(),
      status: 'recruiting',
    });
    return await this.assignmentRepository.save(assignment);
  }

  // Volunteer joins an assignment
  async assignVolunteer(assignVolunteerDto: AssignVolunteerDto): Promise<Assignment> {
    const assignment = await this.assignmentRepository.findOneBy({
      id: assignVolunteerDto.assignmentId,
    });

    if (!assignment) throw new Error('Assignment not found');
    if (assignment.assignedVolunteers >= assignment.requiredVolunteers) {
      throw new Error('No more volunteers needed for this assignment');
    }

    // Check if the user status is "unassigned"
    const user = await this.userRepository.findOneBy({ id: assignVolunteerDto.userId });
    if (!user) throw new Error('User not found');
    if (user.status !== 'unassigned') {
      throw new Error('User is not available for assignment');
    }

    const volunteerLog = this.volunteerLogRepository.create({
      user: user,
      assignment: assignment,
      assignedAt: new Date(),
    });

    await this.volunteerLogRepository.save(volunteerLog);

    // Update the number of assigned volunteers
    assignment.assignedVolunteers += 1;

    // Update the status if the required number of volunteers is met
    if (assignment.assignedVolunteers >= assignment.requiredVolunteers) {
      assignment.status = 'active';
    }

    await this.assignmentRepository.save(assignment);

    return assignment;
  }

  // Delete an assignment
  async deleteAssignment(assignmentId: number): Promise<void> {
    const assignment = await this.assignmentRepository.findOne({ where: { id: assignmentId } });
    if (!assignment) throw new Error('Assignment not found');
    await this.assignmentRepository.remove(assignment);
  }

  // Get all assignments for volunteers
  async getAllRecruitingAssignments(): Promise<Assignment[]> {
    return await this.assignmentRepository.find({ where: { status: 'recruiting' } });
  }

  // Get all assignments for admin
  async getAllAssignmentsForAdmin(): Promise<Assignment[]> {
    const assignments = await this.assignmentRepository.find();
    return assignments.sort((a, b) => {
      const statusOrder = ['recruiting', 'active', 'completed', 'cancelled'];
      return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
    });
  }

  // Update assignment status
  async updateAssignmentStatus(assignmentId: number, status: string): Promise<Assignment> {
    const assignment = await this.assignmentRepository.findOne({ where: { id: assignmentId } });
    if (!assignment) throw new Error('Assignment not found');
    assignment.status = status;
    return await this.assignmentRepository.save(assignment);
  }
}