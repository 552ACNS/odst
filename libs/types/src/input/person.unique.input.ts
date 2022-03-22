import { Prisma } from '.prisma/client';
import { InputType } from '@nestjs/graphql';

// Uniquely identify a person with these fields. Only pass 1 of these fields, will cause exception otherwise.
@InputType()
export class PersonWhereUniqueInput implements Prisma.PersonWhereUniqueInput {
  id?: string;
  dodId?: number;
  ssn?: number;
  email?: string;
}
