import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';

export class AdminController {

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
}
