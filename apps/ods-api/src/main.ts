/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'ods-api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3343;
  await app.listen(port);
  Logger.log(
    `🚀 ${process.env.NODE_ENV} application is running on: http://localhost:${port}/graphql`
  );
}

bootstrap();
