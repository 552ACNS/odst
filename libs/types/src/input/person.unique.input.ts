import {
  BirthState,
  EyeColor,
  HairColor,
  Prisma,
  Role,
  Spec,
} from '.prisma/client';
import { Field, InputType } from '@nestjs/graphql';

// Uniquely identify a person with these fields. Only pass 1 of these fields, will cause exception otherwise.
@InputType()
export class PersonWhereUniqueInput implements Prisma.PersonWhereUniqueInput {

  id?: string;

  dodId?: number;

  ssn?: number;

  email?: string;
}

//TODO not sure where to put this
@InputType()
export class PersonWhereInput implements Prisma.PersonWhereInput {
  id?: string;

  @Field(() => HairColor)
  hairColor?: HairColor;
  dodId?: number;
  ssn?: number;
  email?: string;
  firstName?: string;
  middleInitial?: string;
  lastName?: string;
  birthDate?: Date;
  birthCity?: string;
  birthCountry?: string;
  citizenshipId?: string;
  initialTraining?: boolean;
  NDA?: boolean;
  grade?: number;

  @Field(() => EyeColor)
  eyeColor?: EyeColor;

  @Field(() => BirthState)
  birthState?: BirthState;

  @Field(() => Role)
  role?: Role;

  @Field(() => Spec)
  spec?: Spec;
  height?: number;
}
