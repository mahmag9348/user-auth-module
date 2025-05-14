import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.usersService.create(
      createUserDto.email,
      createUserDto.name,
      hashedPassword,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: RequestWithUser): Promise<User> {
    const user = await this.usersService.findById(req.user.userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findById(id);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<User | null> {
    return this.usersService.findByEmail(email);
  }
}