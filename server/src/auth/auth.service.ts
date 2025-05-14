import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(email: string, name: string, password: string) {
    const user = await this.usersService.create(email, name, password);
    return this.generateToken(user);
  }

  async signIn(user: User) {
    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = { userId: user._id, email: user.email };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });
    
    return {
      access_token,
      refresh_token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async logout() {
    // In a stateless JWT setup, we don't need to do anything server-side
    // The client will handle removing the tokens
    return { message: 'Logged out successfully' };
  }
}