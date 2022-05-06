import { NestFactory } from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
  registerEnumType,
} from '@nestjs/graphql';
import { writeFileSync } from 'fs';
import { printSchema } from 'graphql';
import { join } from 'path';
import { OrgResolver } from './src/org/org.resolver';
import { UserResolver } from './src/user/user.resolver';
import { Role, OrgTier } from '.prisma/ods/client';
import { AnswerResolver } from './src/answer/answer.resolver';
import { QuestionResolver } from './src/question/question.resolver';
import { SurveyResolver } from './src/survey/survey.resolver';
import { SurveyResponseResolver } from './src/surveyResponse/surveyResponse.resolver';

registerEnumType(Role, { name: 'Role' });
// registerEnumType(Spec, { name: 'Spec' });
registerEnumType(OrgTier, { name: 'OrgTier' });

const resolvers = [
  AnswerResolver,
  OrgResolver,
  QuestionResolver,
  SurveyResolver,
  SurveyResponseResolver,
  UserResolver,
];

export async function generateSchema(): Promise<void> {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);

  const schema = await gqlSchemaFactory.create(resolvers);

  writeFileSync(
    join(process.cwd(), 'apps/ods-api/schema.graphql'),
    printSchema(schema)
  );
}

generateSchema();
