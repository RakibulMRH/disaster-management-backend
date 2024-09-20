import { Request, Response } from 'express';
import { UserService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { validate } from 'class-validator';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.registerUser = this.registerUser.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.getAllUsersByRole = this.getAllUsersByRole.bind(this);
    this.requestPasswordReset = this.requestPasswordReset.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  // Register a new user (Admin)
  registerUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const currentUser = req.user;
      if (!currentUser) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      // Only admin can register new users
      if (currentUser.role !== 'Admin') {
        return res.status(403).json({ message: 'You are not authorized to register new users' });
      }

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
  getUserById = async (req: AuthenticatedRequest, res: Response) => {
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
  updateUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      const updateUserDto = req.body as UpdateUserDto;
      const currentUser = req.user;

      if (!currentUser) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

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

  // Delete a user (only admin can delete)
  deleteUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      const currentUser = req.user;

      if (!currentUser) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      // Only allow delete if the user is admin
      if (currentUser.role !== 'Admin') {
        return res.status(403).json({ message: 'You are not authorized to delete this user' });
      }

      await this.userService.deleteUser(userId);
      return res.status(204).json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  };

  // Get all users (admin action)
  getAllUsers = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const currentUser = req.user;
      if (!currentUser) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

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

  //get all user by role
  getAllUsersByRole = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const currentUser = req.user;
      if (!currentUser) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      // Only admin can view all users
      if (currentUser.role !== 'Admin') {
        return res.status(403).json({ message: 'You are not authorized to view all users' });
      }

      const role = req.params.role;
      const users = await this.userService.getAllUsersByRole(role);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  };
  
  // Request password reset and send PIN via email
  async requestPasswordReset(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;
      await this.userService.requestPasswordReset(email);
      return res.status(200).json({ message: 'Password reset PIN sent to your email.' });
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  // Reset the password using PIN, username or email
  async resetPassword(req: Request, res: Response): Promise<Response> {
    try {
      const { pin, newPassword, identifier } = req.body; // identifier can be either username or email
      await this.userService.resetPassword(pin, newPassword, identifier);
      return res.status(200).json({ message: 'Password has been reset successfully.' });
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

}