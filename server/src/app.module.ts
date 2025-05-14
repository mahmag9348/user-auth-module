import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoggerModule } from './logger/logger.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.uri, databaseConfig.options),
    LoggerModule,
    AuthModule,
    UsersModule
  ],
})
export class AppModule {}