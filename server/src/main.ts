import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for the frontend
  app.enableCors({
    origin: true, // Allow all origins in development
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With', 'Access-Control-Allow-Origin'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    preflightContinue: false,
    optionsSuccessStatus: 204
  });

  // Enable validation pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(4000); // Using port 4000 for the backend
  console.log('Server running on http://localhost:4000');
}

bootstrap();