import { Repository } from 'typeorm';
import { User } from '../models/user.model';

export class UsersService {
  private userRepository: Repository<User>;
 

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

   
}
