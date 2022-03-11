import {
  Prisma,
} from '.prisma/client';
import { Field, InputType } from '@nestjs/graphql';

// Uniquely identify a person with these fields. Only pass 1 of these fields, will cause exception otherwise.
@InputType()
export class PersonWhereUniqueInput implements Prisma.PersonWhereUniqueInput {
  @Field(() => String, { nullable: true})
  id?: string;

  @Field(() => Number, { nullable: true})
  dodId?: number;

  @Field(() => Number, { nullable: true})
  ssn?: number;

  @Field(() => String, { nullable: true})
  email?: string;
}
