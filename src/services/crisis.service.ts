import { AppDataSource } from '../config/database.config';
import { Crisis } from '../models/crisis.model';  
import { CreateCrisisDto, UpdateCrisisDto } from '../dtos/crisis.dto';  
import { User } from '../models/user.model'; 

export class CrisisService {
  private crisisRepository = AppDataSource.getRepository(Crisis);
  private userRepository = AppDataSource.getRepository(User);

  // Get all approved crises (Anonymous users can view them)
  async getAllCrises(): Promise<Crisis[]> {
    return await this.crisisRepository.find({
      where: { status: 'approved' }, // Show only approved crises
    });
  }

  async getPendingCrises(): Promise<Crisis[]> {
    return await this.crisisRepository.find({
      where: { status: 'pending' }, // Show only approved crises
    });
  }

  // Create a new crisis (Anonymous users can add crises)
  async createCrisis(createCrisisDto: CreateCrisisDto): Promise<Crisis> {
    const crisis = this.crisisRepository.create({
      ...createCrisisDto,
      status: 'pending', // Crises are pending until approved by admin
      dateReported: new Date(),
    });

    if (createCrisisDto.imageUrl) {
      crisis.imageUrl = createCrisisDto.imageUrl;
    }

    return await this.crisisRepository.save(crisis);
  }

  // Admin can approve or update a crisis
  async approveCrisis(id: number, adminId: number): Promise<Crisis | null> {
    const crisis = await this.crisisRepository.findOne({ where: { id } });
    if (!crisis) throw new Error('Crisis not found');

    const admin = await this.userRepository.findOne({ where: { id: adminId } });
    if (!admin) throw new Error('Admin not found');

    crisis.status = 'approved';
    crisis.dateApproved = new Date();
    crisis.approvedByAdmin = admin;

    return await this.crisisRepository.save(crisis);
  }

  // Update other details of a crisis
  async updateCrisis(id: number, updateCrisisDto: UpdateCrisisDto): Promise<Crisis | null> {
    const crisis = await this.crisisRepository.findOne({ where: { id } });
    if (!crisis) throw new Error('Crisis not found');

    Object.assign(crisis, updateCrisisDto);

    return await this.crisisRepository.save(crisis);
  }

  // Delete a crisis (Admin only)
  async deleteCrisis(id: number): Promise<void> {
    const crisis = await this.crisisRepository.findOne({ where: { id } });
    if (!crisis) throw new Error('Crisis not found');
    await this.crisisRepository.remove(crisis);
  }
}
