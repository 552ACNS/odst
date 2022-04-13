import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';

@InputType()
export class DateTimeNullableFilter implements Prisma.DateTimeNullableFilter {
  equals?: Date;
  in?: Date[];
  notIn?: Date[];
  lt?: Date;
  lte?: Date;
  gt?: Date;
  gte?: Date;

  @Field(() => DateTimeNullableFilter)
  not?: Prisma.NestedDateTimeNullableFilter;
}

@InputType()
export class DateTimeFilter
  extends DateTimeNullableFilter
  implements Prisma.DateTimeFilter
{
  @Field(() => DateTimeFilter)
  not?: Prisma.NestedDateTimeFilter;
}

@InputType()
export class StringNullableFilter implements Prisma.StringNullableFilter {
  equals?: string;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;

  // mode?: QueryMode

  @Field(() => StringFilter, { nullable: true })
  not?: Prisma.NestedStringNullableFilter;
}

@InputType()
export class StringFilter
  extends StringNullableFilter
  implements Prisma.StringFilter
{
  @Field(() => StringFilter)
  not?: Prisma.NestedStringFilter;
}

@ObjectType()
export class responseCount {
  unresolved: number;
  overdue: number;
  resolved: number;
}
