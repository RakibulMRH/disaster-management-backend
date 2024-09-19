import { AppDataSource } from '../config/database.config';
import { Assignment } from '../models/assignment.model';
import { VolunteerAssignment } from '../models/volunteerAssignment.model';
import { User } from '../models/user.model';
import { CreateAssignmentDto, UpdateAssignmentDto } from '../dtos/assignment.dto';

export class AssignmentService {
  private assignmentRepository = AppDataSource.getRepository(Assignment);
  private volunteerAssignmentRepository = AppDataSource.getRepository(VolunteerAssignment);
  private userRepository = AppDataSource.getRepository(User);

  // Create a new assignment (Admin only)
  async createAssignment(createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    const assignment = this.assignmentRepository.create(createAssignmentDto);
    return await this.assignmentRepository.save(assignment);
  }

  // Assign a volunteer to an assignment
  async assignVolunteer(assignmentId: number, userId: number): Promise<VolunteerAssignment | null> {
    const assignment = await this.assignmentRepository.findOne({
      where: { id: assignmentId },
      relations: ['volunteers'],
    });
    if (!assignment) throw new Error('Assignment not found');

    const volunteer = await this.userRepository.findOne({ where: { id: userId } });
    if (!volunteer) throw new Error('Volunteer not found');

    // Check if there are enough spots for more volunteers
    if (assignment.volunteers.length >= assignment.requiredVolunteers) {
      throw new Error('No more volunteers are needed for this assignment');
    }

    const volunteerAssignment = this.volunteerAssignmentRepository.create({
      volunteer,
      assignment,
      dateAssigned: new Date(),
      status: 'active',
    });

    return await this.volunteerAssignmentRepository.save(volunteerAssignment);
  }

  // Other assignment service functions
  async updateAssignment(id: number, updateAssignmentDto: UpdateAssignmentDto): Promise<Assignment | null> {
    const assignment = await this.assignmentRepository.findOne({ where: { id } });
    if (!assignment) throw new Error('Assignment not found');

    Object.assign(assignment, updateAssignmentDto);
    return await this.assignmentRepository.save(assignment);
  }

  async getAllAssignments(): Promise<Assignment[]> {
    return await this.assignmentRepository.find({ relations: ['volunteers'] });
  }

  async deleteAssignment(id: number): Promise<void> {
    const assignment = await this.assignmentRepository.findOne({ where: { id } });
    if (!assignment) throw new Error('Assignment not found');
    await this.assignmentRepository.remove(assignment);
  }
}
