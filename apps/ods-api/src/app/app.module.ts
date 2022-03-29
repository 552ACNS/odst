import { Module } from '@nestjs/common';
import {
  Role,
  // Spec,
  OrgTier,
} from '.prisma/ods/client';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import { join } from 'path';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SurveyResponseModule } from '../surveyResponse/surveyResponse.module';
import { OrgModule } from '../org/org.module';

// Register enum types here, if they are used in multiple places, make sure that they are registered
// only once and that the resource module that is imported first is the one that registers them
registerEnumType(Role, { name: 'Role' });
// registerEnumType(Spec, { name: 'Spec' });
registerEnumType(OrgTier, { name: 'OrgTier' });

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'apps/ods-api/schema.graphql'),
      playground: false,
      introspection: process.env.NODE_ENV !== 'production',
      driver: ApolloDriver,
      plugins: [
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageDisabled()
          : ApolloServerPluginLandingPageLocalDefault(),
      ],
    }),
    SurveyResponseModule,
    OrgModule,
  ],
})
export class AppModule {}
