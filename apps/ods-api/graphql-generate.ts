// import { NestFactory } from '@nestjs/core';
// import {
//   GraphQLSchemaBuilderModule,
//   GraphQLSchemaFactory,
// } from '@nestjs/graphql';
// import { writeFileSync } from 'fs';
// import { printSchema } from 'graphql';
// import { join } from 'path';
// import { OrgResolver } from './src/org/org.resolver';
// import { UserResolver } from './src/user/user.resolver';
// import { AnswerResolver } from './src/answer/answer.resolver';
// import { QuestionResolver } from './src/question/question.resolver';
// import { SurveyResolver } from './src/survey/survey.resolver';
// import { SurveyResponseResolver } from './src/surveyResponse/surveyResponse.resolver';
// import { AuthResolver } from '@odst/auth';

// // No need to register anymore with graphql-prisma-nestjs-generator.
// // registerEnumType(Role, { name: 'Role' });
// // // registerEnumType(Spec, { name: 'Spec' });
// // registerEnumType(OrgTier, { name: 'OrgTier' });

// const resolvers = [
//   AnswerResolver,
//   OrgResolver,
//   QuestionResolver,
//   SurveyResolver,
//   SurveyResponseResolver,
//   UserResolver,
//   AuthResolver,
// ];

// export async function generateSchema(): Promise<void> {
//   const app = await NestFactory.create(GraphQLSchemaBuilderModule);
//   await app.init();

//   const gqlSchemaFactory = app.get(GraphQLSchemaFactory);

//   const schema = await gqlSchemaFactory.create(resolvers);

//   writeFileSync(
//     join(process.cwd(), 'appas/ods-api/schema.graphql'),
//     printSchema(schema)
//   );
// }

// generateSchema();
