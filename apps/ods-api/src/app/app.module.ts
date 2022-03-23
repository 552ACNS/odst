import { Module } from '@nestjs/common';
import {
  Role,
  //Spec,
  OrgTier,
} from '.prisma/ods/client';
import { registerEnumType } from '@nestjs/graphql';
import { SurveyModule } from '../survey/survey.module';
import { OrgModule } from '../org/org.module';

// Register enum types here, if they are used in multiple places, make sure that they are registered
// only once and that the resource module that is imported first is the one that registers them
registerEnumType(Role, { name: 'Role' });
//registerEnumType(Spec, { name: 'Spec' });
registerEnumType(OrgTier, { name: 'OrgTier' });

@Module({
  imports: [SurveyModule, OrgModule],
})
export class AppModule {}
