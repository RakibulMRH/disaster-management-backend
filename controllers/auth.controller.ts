// src/controllers/auth.controller.ts
import { Router, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dtos/user.dto';
import { LoginDto } from '../dtos/login.dto';
import { validate } from 'class-validator';

const router = Router();
const authService = new AuthService();

router.post('/register', async (req: Request, res: Response) => {
  const createUserDto = new CreateUserDto();
  Object.assign(createUserDto, req.body);

  const errors = await validate(createUserDto);
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const user = await authService.register(createUserDto);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const loginDto = new LoginDto();
  Object.assign(loginDto, req.body);

  const errors = await validate(loginDto);
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const token = await authService.login(loginDto);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
});

router.get('/test', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Auth controller is working' });
});

export default router;