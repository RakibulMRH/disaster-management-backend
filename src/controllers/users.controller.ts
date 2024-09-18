import { Router, Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { authMiddleware } from '../middleware/auth.middleware';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { UpdateUserDto } from '../dtos/user.dto';

const router = Router();
const usersService = new UsersService();

router.get('/profile', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const user = await usersService.getUserById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

 

export default router;
