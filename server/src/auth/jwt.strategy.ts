import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key', // In production, use environment variables
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findById(payload.userId);
    if (!user) {
      throw new Error('User not found');
    }
    return { userId: payload.userId, email: payload.email };
  }
}
