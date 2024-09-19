import { AppDataSource } from '../config/database.config';
import { User } from '../models/user.model';


export class AdminService {
  // Verify a user by ID
  static async verifyUser(userId: number) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    // Mark the user as verified
    user.isVerified = true;
    await userRepository.save(user);

    return user;
  }

  // Assign a role to a user (Admin, Volunteer, etc.)
  static async assignRole(userId: number, role: string) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    // Assign the role
    user.role = role;
    await userRepository.save(user);

    return user;
  }

  // List all unverified users
  static async listUnverifiedUsers() {
    const userRepository = AppDataSource.getRepository(User);
    const unverifiedUsers = await userRepository.find({ where: { isVerified: false } });
    return unverifiedUsers;
  }

  
}
