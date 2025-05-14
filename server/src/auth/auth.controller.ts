import { Controller, Post, Body, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(
      createUserDto.email,
      createUserDto.name,
      createUserDto.password,
    );
  }

  @Post('signin')
  async signIn(@Body() credentials: { email: string; password: string }) {
    const user = await this.usersService.findByEmail(credentials.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.usersService.validatePassword(
      user,
      credentials.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.signIn(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout() {
    return this.authService.logout();
  }
}