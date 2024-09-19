import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';
import { CrisisService } from '../services/crisis.service';

export class AdminController {
  private crisisService = new CrisisService(); 
  // Verify a user by ID
  static async verifyUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);
      const verifiedUser = await AdminService.verifyUser(userId);
      return res.status(200).json({ message: 'User verified successfully', user: verifiedUser });
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }

  // Assign a role to a user
  static async assignRole(req: Request, res: Response) {
    try {
      const { userId, role } = req.body;
      const updatedUser = await AdminService.assignRole(userId, role);
      return res.status(200).json({ message: `Role ${role} assigned to user`, user: updatedUser });
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }

  // List all unverified users
  static async listUnverifiedUsers(req: Request, res: Response) {
    try {
      const unverifiedUsers = await AdminService.listUnverifiedUsers();
      return res.status(200).json(unverifiedUsers);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  // Admin approves a crisis
  static async approveCrisis(req: Request, res: Response) {
    try {
      const crisisId = parseInt(req.params.id, 10);
      const adminId = req.user!.id;  // Admin user ID from the request
      const crisisService = new CrisisService(); // Instantiate the service
      const approvedCrisis = await crisisService.approveCrisis(crisisId, adminId);
      return res.status(200).json({
        message: 'Crisis approved successfully',
        crisis: approvedCrisis,
      });
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }

  // Admin updates a crisis (approve or modify crisis details)
  static async updateCrisis(req: Request, res: Response) {
    try {
      const crisisId = parseInt(req.params.id, 10);
      const crisisData = req.body;
      const crisisService = new CrisisService(); // Instantiate the service
      const updatedCrisis = await crisisService.updateCrisis(crisisId, crisisData);
      return res.status(200).json({
        message: 'Crisis updated successfully',
        crisis: updatedCrisis,
      });
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }


  // Admin deletes a crisis
  static async deleteCrisis(req: Request, res: Response) {
    try {
      const crisisId = parseInt(req.params.id, 10);
      const crisisService = new CrisisService(); // Instantiate the service
      await crisisService.deleteCrisis(crisisId);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }
}
