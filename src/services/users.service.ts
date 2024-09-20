import { AppDataSource } from '../config/database.config';
import { User } from '../models/user.model';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { hash, compare } from 'bcryptjs';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  // Create a new user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await hash(createUserDto.password, 10);  // Hashing password before storing
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  // Get a user by ID
  async getUserById(userId: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  // Update a user
  async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (updateUserDto.newPassword) {
      const { currentPassword, newPassword } = updateUserDto;

      // Check if current password is provided
      if (!currentPassword) {
        throw new Error('Current password is required to update the password');
      }

      // Compare current password with the stored password
      const isMatch = await compare(currentPassword, user.password);
      if (!isMatch) {
        throw new Error('Current password is incorrect');
      }

      // Hash the new password
      updateUserDto.newPassword = await hash(newPassword, 10);
    }

    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  // Delete a user
  async deleteUser(userId: number): Promise<void> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.remove(user);
  }

  // Get all users
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Get all users by role
  async getAllUsersByRole(role: string): Promise<User[]> {
    return await this.userRepository.find({ where: { role } });
  }
}
