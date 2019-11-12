import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: Login) {
    return this.authService.login(body);
  }

  @Post('signup')
  async signup(@Body() body: Login) {
    return this.authService.signUp(body);
  }
}
