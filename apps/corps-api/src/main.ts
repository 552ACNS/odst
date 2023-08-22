/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  const globalPrefix = 'corps-api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3353;
  await app.listen(port);
  Logger.log(
    `🚀 ${process.env.NODE_ENV} CORPS is running on: http://localhost:${port}/graphql`
  );
}

bootstrap();
