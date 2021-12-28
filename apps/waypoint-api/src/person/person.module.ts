import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonResolver } from './person.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { OrgModule } from '../org/org.module';

@Module({
  imports: [OrgModule],
  providers: [PersonResolver, PersonService, PrismaService],
})
export class PersonModule {}
