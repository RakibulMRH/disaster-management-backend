import { AppDataSource } from '../config/database.config';
import { Donation } from '../models/donation.model';
import { Crisis } from '../models/crisis.model';  // Import Crisis model
import { CreateDonationDto } from '../dtos/donation.dto';  // Import DTO

export class DonationService {
  private donationRepository = AppDataSource.getRepository(Donation);
  private crisisRepository = AppDataSource.getRepository(Crisis);

  // Create a donation linked to a crisis
  async createDonation(createDonationDto: CreateDonationDto): Promise<Donation> {
    const crisis = await this.crisisRepository.findOne({ where: { id: createDonationDto.crisisId, status: 'approved' } });
    
    if (!crisis) {
      throw new Error('Crisis not found or not approved');
    }

    const donation = this.donationRepository.create({
      ...createDonationDto,
      crisis: crisis,
    });

    return await this.donationRepository.save(donation);
  }

  // Get the total fund for a specific crisis
  async getTotalFund(crisisId: number): Promise<number> {
    const result = await this.donationRepository
      .createQueryBuilder('donation')
      .select('SUM(donation.amount)', 'total')
      .where('donation.crisisId = :crisisId', { crisisId })
      .getRawOne();
    
    return parseFloat(result.total);
  }

  // Get all donations for a specific crisis
  async getAllDonations(crisisId: number): Promise<Donation[]> {
    return await this.donationRepository.find({
      where: { crisis: { id: crisisId } },
      relations: ['crisis'],
    });
  }
}
