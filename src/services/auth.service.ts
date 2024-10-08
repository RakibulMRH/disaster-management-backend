import { AppDataSource } from '../config/database.config';
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt, { Algorithm } from 'jsonwebtoken';

export class AuthService {
  // Function to create a new user
  static async createUser(userData: Partial<User>) {
    const userRepository = AppDataSource.getRepository(User);

    // Create new user instance
    const newUser = userRepository.create(userData);

    // Save user to the database
    await userRepository.save(newUser);

    return newUser;
  }

  // Function to validate password
  static async validatePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  // Function to generate a JWT token
  static generateJwt(user: User): string {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const payload = {
      id: user.id,
      username: user.username, 
      role: user.role,
      
    };

    const options: jwt.SignOptions = {
      expiresIn: '1h',  
      algorithm: 'HS256' as Algorithm 
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
  }

  // Function to find a user by username or email
  static async findByUsernameOrEmail(usernameOrEmail: string) {
    const userRepository = AppDataSource.getRepository(User);
    return userRepository.findOne({
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
  }
}