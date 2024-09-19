import { AppDataSource } from '../config/database.config';
import { User } from '../models/user.model';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { hash } from 'bcryptjs';

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

    if (updateUserDto.password) {
      updateUserDto.password = await hash(updateUserDto.password, 10);  // Hash updated password if exists
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
}
