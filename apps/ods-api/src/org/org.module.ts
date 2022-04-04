import { Module } from '@nestjs/common';
import { OrgService } from './org.service';
import { OrgResolver } from './org.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { SurveyService } from '../survey/survey.service';
import { UserService } from '../user/user.service';

@Module({
  providers: [OrgResolver, OrgService, SurveyService, UserService, PrismaService],
})
export class OrgModule {}
