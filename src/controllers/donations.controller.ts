import { Request, Response } from 'express';
import { DonationService } from '../services/donations.service';
import { CreateDonationDto } from '../dtos/donation.dto';  // Import DTO

export class DonationController {
  private donationService: DonationService;

  constructor() {
    this.donationService = new DonationService(); // Instantiate DonationService
  }

  // Create a donation
  async createDonation(req: Request, res: Response) {
    try {
      const donationData: CreateDonationDto = req.body;
      const newDonation = await this.donationService.createDonation(donationData);
      return res.status(201).json({
        message: 'Donation successful',
        donation: newDonation,
      });
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  // Get the total fund amount for a specific crisis
  async getTotalFund(req: Request, res: Response): Promise<void> {
    try {
      const crisisId = parseInt(req.params.crisisId, 10);
      const { totalFund, goal } = await this.donationService.getTotalFund(crisisId);
      res.status(200).json({ totalFund, goal });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  // Get all donations for a specific crisis
  async getAllDonations(req: Request, res: Response) {
    try {
      const crisisId = parseInt(req.params.crisisId, 10);
      const donations = await this.donationService.getAllDonations(crisisId);
      return res.status(200).json(donations);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  // Get all donations funds for all crises
  async getAllDonationsFunds(req: Request, res: Response) {
    try {
      const donationsFunds = await this.donationService.getAllDonationsFunds();
      return res.status(200).json(donationsFunds);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  // Get all donations list for all crises
  async getAllDonationsList(req: Request, res: Response) {
    try {
      const donationsList = await this.donationService.getAllDonationsList();
      return res.status(200).json(donationsList);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}
