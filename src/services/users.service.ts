import { AppDataSource } from '../config/database.config';
import { User } from '../models/user.model';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { hash, compare } from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { MoreThan } from 'typeorm';


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

      // Check if current password is  
      if (!currentPassword) {
        throw new Error('Current password is required to update the password');
      }
      const isSame = await compare(currentPassword, user.password);
      if (isSame) {
        throw new Error('New password must be different from the current password');
      }

      // Compare current password with the stored password
      const isMatch = await compare(currentPassword, user.password);
      if (!isMatch) {
        throw new Error('Current password is incorrect');
      }

      // Hash the new password
      user.password = await hash(newPassword, 10);
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
    return await this.userRepository.find({ where: { role, isVerified: true } });
  }

  // Method to generate and send reset PIN
  async generateResetPin(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found.');
    }

    const resetPin = Math.floor(100000 + Math.random() * 900000).toString();

    // Set PIN and expiration (e.g., 15 minutes)
    user.resetPasswordToken = resetPin;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiration

    await this.userRepository.save(user);

    // Send reset PIN via email
    await this.sendResetPinEmail(user.email, resetPin);
  }

  // Verify the PIN and reset the password using username or email
  async resetPassword(pin: string, newPassword: string, identifier: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: [
        { resetPasswordToken: pin, resetPasswordExpires: MoreThan(new Date()), username: identifier },
        { resetPasswordToken: pin, resetPasswordExpires: MoreThan(new Date()), email: identifier }
      ],
    });

    if (!user) {
      throw new Error('Invalid or expired PIN or identifier.');
    }

    // Hash the new password before saving
    const hashedPassword = await hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await this.userRepository.save(user);
  }

  // Send PIN via email using nodemailer
  private async sendResetPinEmail(email: string, pin: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'aiubsemester1@gmail.com',
        pass: 'zpip miax heks pdnk',
      },
    });

    const mailOptions = {
      from: 'aiubsemester1@gmail.com',
      to: email,
      subject: 'Your Password Reset PIN',
      text: `Your password reset PIN is ${pin}. It will expire in 15 minutes.`,
    };

    await transporter.sendMail(mailOptions);
  }

  // Generate PIN and send email
  async requestPasswordReset(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('User with this email does not exist.');
    }

    // Generate a 6-digit PIN
    const resetPin = Math.floor(100000 + Math.random() * 900000).toString();

    // Set PIN and expiration (e.g., 15 minutes)
    user.resetPasswordToken = resetPin;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiration

    await this.userRepository.save(user);

    // Send reset PIN via email
    await this.sendResetPinEmail(user.email, resetPin);
  }
}