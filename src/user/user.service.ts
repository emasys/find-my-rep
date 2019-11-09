import { Injectable } from '@nestjs/common';
import { Users } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async findOne(username: string): Promise<Users | undefined> {
    return this.userRepository.findOne({ username });
  }

  async createUser(
    username: string,
    password: string,
  ): Promise<Users | undefined> {
    const user = new Users();
    user.password = password;
    user.username = username;
    return this.userRepository.save(user);
  }
}
