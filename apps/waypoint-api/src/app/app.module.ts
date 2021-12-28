import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PersonModule } from '../person/person.module';
import { OrgModule } from '../org/org.module';
import { IncidentModule } from '../incident/incident.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: process.env.NODE_ENV !== 'production',
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
      // Disables playground because the apollo server system is better
    }),
    PersonModule,
    OrgModule,
    IncidentModule    
  ],
})
export class AppModule {}
