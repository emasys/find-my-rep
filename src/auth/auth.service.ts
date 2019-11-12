import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Login } from './auth.dto';

@Injectable()
export class AuthService {
  private saltRounds = 10;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async getHash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compareHash(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async validateUser(
    username: string,
    pass: string,
  ): Promise<{ id: number; username: string }> {
    const user = await this.usersService.findOne(username);
    const hashedPassword = await this.compareHash(pass, user && user.password || '');
    if (user && hashedPassword) {
      const { password, createdAt, updatedAt, addedBy, ...result } = user;
      return result;
    }
    return null;
  }

  async signUp(payload: Login) {
    const { username, password } = payload;
    try {
      const hashedPassword = await this.getHash(password);
      const { id } = await this.usersService.createUser(
        username,
        hashedPassword,
      );
      return {
        username,
        access_token: this.jwtService.sign({ username, id }),
      };
    } catch (error) {
      if (error.message && error.message.includes('duplicate')) {
        throw new ConflictException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async login(user: Login) {
    const { username, password } = user;
    const payload = await this.validateUser(username, password);
    if (!payload) {
      throw new NotFoundException('User not found');
    }
    return {
      username,
      access_token: this.jwtService.sign(payload),
    };
  }
}
