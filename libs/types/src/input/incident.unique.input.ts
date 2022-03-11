import { Prisma } from '.prisma/client';
import { Field, InputType } from '@nestjs/graphql';

// Uniquely identify a person with these fields. Only pass 1 of these fields, will cause exception otherwise.
@InputType()
export class IncidentWhereUniqueInput
  implements Prisma.IncidentWhereUniqueInput
{
  @Field(() => String, { nullable: true})
  id?: string;
}
