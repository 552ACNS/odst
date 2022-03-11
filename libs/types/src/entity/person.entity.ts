import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  BirthState,
  EyeColor,
  HairColor,
  Person,
  Role,
  Spec,
} from '@prisma/client';

@ObjectType()
@InputType('PersonGQLInput')
export class PersonGQL implements Person {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => Number)
  dodId: number;

  @Field(() => Number)
  ssn: number;

  @Field(() => String)
  email: string;

  @Field(() => String)
  firstName: string;

  @Field(() => HairColor)
  hairColor: HairColor;

  @Field(() => String, { nullable: true })
  middleInitial: string | null;

  @Field(() => String)
  lastName: string;

  @Field(() => Date)
  birthDate: Date;

  @Field(() => String)
  birthCity: string;

  @Field(() => Boolean)
  birthCountry: string;

  @Field(() => Number)
  height: number;

  @Field(() => BirthState)
  birthState: BirthState;

  @Field(() => String)
  citizenshipId: string;

  @Field(() => Boolean)
  initialTraining: boolean;

  @Field(() => Boolean)
  NDA: boolean;

  @Field(() => Number)
  grade: number;

  @Field(() => String)
  orgId: string;

  @Field(() => EyeColor)
  eyeColor: EyeColor;

  @Field(() => Spec)
  spec: Spec;

  @Field(() => Role)
  role: Role;
}
