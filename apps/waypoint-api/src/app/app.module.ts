import { Module } from '@nestjs/common';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { PersonModule } from '../person/person.module';
import { UserModule } from '../user/user.module';
import { OrgModule } from '../org/org.module';
import { IncidentModule } from '../incident/incident.module';
import {
  HairColor,
  EyeColor,
  BirthState,
  Role,
  Spec,
  OrgTier,
} from '@prisma/client';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import { join } from 'path';
import { AuthModule } from '../auth/auth.module';

// Register enum types here, if they are used in multiple places, make sure that they are registered
// only once and that the resource module that is imported first is the one that registers them
registerEnumType(HairColor, { name: 'HairColor' });
registerEnumType(EyeColor, { name: 'EyeColor' });
registerEnumType(BirthState, { name: 'BirthState' });
registerEnumType(Role, { name: 'Role' });
registerEnumType(Spec, { name: 'Spec' });
registerEnumType(OrgTier, { name: 'OrgTier' });

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'apps/waypoint-api/schema.graphql'),
      playground: false,
      introspection: process.env.NODE_ENV !== 'production',
      plugins: [
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageDisabled()
          : ApolloServerPluginLandingPageLocalDefault(),
      ],
    }),
    AuthModule,
    PersonModule,
    UserModule,
    OrgModule,
    IncidentModule,
  ],
})
export class AppModule {}
