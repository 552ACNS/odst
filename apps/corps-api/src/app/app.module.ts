import { Module } from '@nestjs/common';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { AuthModule,JWTAuthGuard } from '@odst/auth';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

// Removed register enum types from here. They are now auto-generated by the
// gql-prisma-nestjs-generator.

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'apps/corps-api/schema.graphql'),
      playground: false,
      introspection: process.env.NODE_ENV !== 'production',
      driver: ApolloDriver,
      plugins: [
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageDisabled()
          : ApolloServerPluginLandingPageLocalDefault(),
      ],
    }),
    UserModule,
    // AuthModule.forRootAsync(AuthModule, {
    //   imports: [UserModule],
    //   inject: [UserService],
    //   useFactory: (userService: UserService) => {
    //     return {
    //       secret: process.env.NX_JWT_SECRET || 'secret',
    //       userService,
    //     };
    //   },
    // }),
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: JWTAuthGuard,
    // },
  ],
})
export class AppModule {}
