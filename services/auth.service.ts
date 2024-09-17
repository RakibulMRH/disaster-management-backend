// services/auth.service.ts
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/user.dto';
import { LoginDto } from '../dtos/login.dto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';


export class AuthService {
  private userRepository: Repository<User>;

  constructor() {
    AppDataSource.initialize().then(() => {
      this.userRepository = AppDataSource.getRepository(User);
    }).catch(error => console.log("Error initializing AppDataSource", error));
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { name, username, password, email, phoneNumber, age } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      name,
      username,
      password: hashedPassword,
      email,
      phoneNumber,
      age,
      role: 'volunteer',
    });

    return this.userRepository.save(user);
  }

  async login(loginDto: LoginDto): Promise<string> {
    const { username, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const payload = { id: user.id, role: user.role };
    const secret = process.env.JWT_SECRET || 'your_jwt_secret';
    const token = jwt.sign(payload, secret, { expiresIn: '1d' });

    return token;
  }
}