import { Injectable, HttpCode, NotFoundException } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Login } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, createdAt, updatedAt, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Login) {
    const { username, password } = user;
    const payload = await this.validateUser(username, password);
    if (!payload) {
      throw new NotFoundException('User not found');
    }
    return {
      payload,
      access_token: this.jwtService.sign(payload),
    };
  }
}
