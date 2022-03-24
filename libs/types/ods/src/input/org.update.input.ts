import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { OrgCreateInput } from './org.create.input';
import { OrgWhereUniqueInput } from './org.unique.input';
import { OrgGQL } from '../entity/org.entity';
import { OrgCreateWithoutSurveysInput } from './org.create.input'

@InputType()
export class OrgUpdateInput
  extends PartialType(OrgCreateInput)
  implements Prisma.OrgUpdateInput {
  //TODO
}

@InputType()
export class OrgUpdateManyWithoutSurveyInput
  implements Prisma.OrgUpdateManyWithoutSurveysInput
{
  @Field(() => [OrgGQL])
  create?: Prisma.OrgCreateWithoutSurveysInput[];

  @Field(() => [OrgUpdateWithWhereUniqueWithoutSurveysInput])
  update?: Prisma.OrgUpdateWithWhereUniqueWithoutSurveysInput[];
}

@InputType()
export class OrgUpdateWithWhereUniqueWithoutSurveysInput
  implements Prisma.OrgUpdateWithWhereUniqueWithoutSurveysInput
{
  @Field(() => OrgWhereUniqueInput)
  where: Prisma.OrgWhereUniqueInput;

  @Field(() => OrgWhereUniqueInput)
  data: OrgWhereUniqueInput;
}

@InputType()
export class OrgUpdateManyWithoutSurveysInput
  implements Prisma.OrgUpdateManyWithoutSurveysInput
{
  @Field(() => [OrgCreateWithoutSurveysInput])
  create?: Prisma.OrgCreateWithoutSurveysInput[];

  @Field(() => [OrgUpdateWithWhereUniqueWithoutSurveysInput])
  update?: Prisma.OrgUpdateWithWhereUniqueWithoutSurveysInput[];
}
