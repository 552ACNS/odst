import { Module } from '@nestjs/common';
import { FeedbackModule } from '../feedback/feedback.module';
import { OrgModule } from '../org/org.module';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { FeedbackResponseModule } from '../feedbackResponse/feedbackResponse.module';
import { QuestionModule } from '../question/question.module';
import { AuthModule } from '@odst/auth';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { JWTAuthGuard } from '@odst/auth';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { AnswerModule } from '../answer/answer.module';
import { CommentModule } from '../comment/comment.module';
import { TagModule } from '../tag/tag.module';
import { PasswordResetModule } from '../password-reset/password-reset.module';

// Removed register enum types from here. They are now auto-generated by the
// gql-prisma-nestjs-generator.

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
    FeedbackModule,
    FeedbackResponseModule,
    OrgModule,
    QuestionModule,
    UserModule,
    AnswerModule,
    CommentModule,
    TagModule,
    PasswordResetModule,
    AuthModule.forRootAsync(AuthModule, {
      imports: [UserModule],
      inject: [UserService],
      useFactory: (userService: UserService) => {
        return {
          secret: process.env.NX_JWT_SECRET || 'secret',
          userService,
        };
      },
    }),
    ScheduleModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JWTAuthGuard,
    },
  ],
})
export class AppModule {}
