import { forwardRef, Module } from '@nestjs/common';
import {
  Role,
  // Spec,
  OrgTier,
} from '.prisma/ods/client';
import { SurveyModule } from '../survey/survey.module';
import { OrgModule } from '../org/org.module';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import { join } from 'path';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SurveyResponseModule } from '../surveyResponse/surveyResponse.module';
import { AnswerModule } from '../answer/answer.module';
import { QuestionModule } from '../question/question.module';
import { UserModule } from '../user/user.module';

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
    SurveyModule,
    SurveyResponseModule,
    AnswerModule,
    OrgModule,
    QuestionModule,
    UserModule,
  ],
})
export class AppModule {}
