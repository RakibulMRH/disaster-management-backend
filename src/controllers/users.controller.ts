import { Request, Response } from 'express';
import { UserService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { validate } from 'class-validator';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // Register a new user (Admin or Volunteer)
  registerUser = async (req: Request, res: Response) => {
    try {
      const createUserDto = req.body as CreateUserDto;

      // Validate input data
      const errors = await validate(createUserDto);
      if (errors.length > 0) {
        return res.status(400).json(errors);
      }

      const newUser = await this.userService.createUser(createUserDto);
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  };

  // Get a user by ID
  getUserById = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await this.userService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  };

  // Update user details (only admin or the user can update)
  updateUser = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      const updateUserDto = req.body as UpdateUserDto;
      const currentUser = req.user!; 

      // Only allow update if the user is admin or the same user
      if (currentUser.role !== 'Admin' && currentUser.id !== userId) {
        return res.status(403).json({ message: 'You are not authorized to update this user' });
      }

      const updatedUser = await this.userService.updateUser(userId, updateUserDto);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  };

  // Delete a user (only admin or the user can delete)
  deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      const currentUser = req.user!;

      // Only allow delete if the user is admin or the same user
      if (currentUser.role !== 'Admin' && currentUser.id !== userId) {
        return res.status(403).json({ message: 'You are not authorized to delete this user' });
      }

      await this.userService.deleteUser(userId);
      return res.status(204).json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  };

  // Get all users (admin action)
  getAllUsers = async (req: Request, res: Response) => {
    try {
      const currentUser = req.user!; 

      // Only admin can view all users
      if (currentUser.role !== 'Admin') {
        return res.status(403).json({ message: 'You are not authorized to view all users' });
      }

      const users = await this.userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  };
}
