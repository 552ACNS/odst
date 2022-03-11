import { NestFactory } from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
  registerEnumType,
} from '@nestjs/graphql';
import { writeFileSync } from 'fs';
import { printSchema } from 'graphql';
import { join } from 'path';
import { AuthResolver } from '../auth/auth.resolver';
import { IncidentResolver } from '../incident/incident.resolver';
import { OrgResolver } from '../org/org.resolver';
import { PersonResolver } from '../person/person.resolver';
import { UserResolver } from '../user/user.resolver';
import {
  HairColor,
  EyeColor,
  BirthState,
  Role,
  Spec,
  OrgTier,
} from '@prisma/client';

registerEnumType(HairColor, { name: 'HairColor' });
registerEnumType(EyeColor, { name: 'EyeColor' });
registerEnumType(BirthState, { name: 'BirthState' });
registerEnumType(Role, { name: 'Role' });
registerEnumType(Spec, { name: 'Spec' });
registerEnumType(OrgTier, { name: 'OrgTier' });

const resolvers = [
  AuthResolver,
  IncidentResolver,
  OrgResolver,
  PersonResolver,
  UserResolver,
];

export async function generateSchema(): Promise<void> {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);

  const schema = await gqlSchemaFactory.create(resolvers);

  writeFileSync(
    join(process.cwd(), 'apps/waypoint-api/src/graphql/schema.graphql'),
    printSchema(schema)
  );
}

generateSchema();
