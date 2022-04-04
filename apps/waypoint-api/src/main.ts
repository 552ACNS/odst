/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'waypoint-api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 ${process.env.NODE_ENV} application is running on: http://localhost:${port}/graphql`
  );
}

bootstrap();



//Things to do to get waypoint updated to "better practices":
//TODO add resolvers for relations
//TODO hide foreign key fields
//TODO any EntityWhereInput input types
//TODO add where field to findMany
//TODO update order to be consistent
//TODO update servicer/resolver tests to mirror ODS
//TODO move auth/refreshToken to a separate library
//TODO user parent interface?
//TODO refactor delete to return boolean
//TODO refactor old resolver/servicer methods that should go through findMany({ where })
