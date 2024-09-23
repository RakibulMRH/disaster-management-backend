import { Request, Response } from 'express';
import { validate } from 'class-validator';
import bcrypt from 'bcryptjs';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dtos/user.dto';  // Import DTO
import { LoginDto } from '../dtos/login.dto';  // Import DTO

// Register function
export const register = async (req: Request, res: Response) => {
  const body = req.body;
  const createUserDto = new CreateUserDto();
  createUserDto.username = body.username;
  createUserDto.password = body.password;
  createUserDto.name = body.name;
  createUserDto.email = body.email;  // Optional fields
  createUserDto.phoneNumber = body.phoneNumber;  // Optional fields
  createUserDto.age = body.age;   

  // Validate the DTO
  const errors = await validate(createUserDto);
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  // Check if username or email already exists
  const existingUser = await AuthService.findByUsernameOrEmail(createUserDto.username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username or email already in use' });
  }
  if (createUserDto.email) {
    const existingUser3 = await AuthService.findByUsernameOrEmail(createUserDto.email);
    if (existingUser3) {
      return res.status(400).json({ message: 'Username or email already in use' });
    }
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

  // Create new user
  const newUser = await AuthService.createUser({
    username: createUserDto.username,
    password: hashedPassword,
    name: createUserDto.name,
    email: createUserDto.email,
    phoneNumber: createUserDto.phoneNumber,
    age: createUserDto.age,
    role: 'Volunteer',  // Default role, you can modify this based on your logic
  });

  return res.status(201).json({ message: 'User registered successfully', newUser });
};
// Login function
export const login = async (req: Request, res: Response) => {
  const body = req.body;
  const loginDto = new LoginDto();
  loginDto.usernameOrEmail = body.usernameOrEmail;
  loginDto.password = body.password;

  // Validate the login DTO
  const errors = await validate(loginDto);
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  // Find the user by username or email
  const user = await AuthService.findByUsernameOrEmail(loginDto.usernameOrEmail);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  if (!user.isVerified) {
    return res.status(403).json({ message: 'User is not verified' });
  }

  // Validate the password
  const isPasswordValid = await AuthService.validatePassword(loginDto.password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = AuthService.generateJwt(user);

  // Return the whole user object along with the token
  return res.status(200).json({ message: 'Login successful', token, user });
};