/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from './validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'waypoint-api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  Logger.log(
    `🚀 ${process.env.NODE_ENV} application is running on: http://localhost:${port}/graphql`
  );
}

bootstrap();
