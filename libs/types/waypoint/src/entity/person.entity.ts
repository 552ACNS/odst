import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  BirthState,
  EyeColor,
  HairColor,
  Person,
  Role,
  Spec,
} from '.prisma/waypoint/client';

@ObjectType()
@InputType('PersonGQLInput')
export class PersonGQL implements Person {
  id: string;
  dodId: number;
  ssn: number;
  email: string;
  firstName: string;

  @Field(() => HairColor)
  hairColor: HairColor;

  middleInitial: string | null;
  lastName: string;
  birthDate: Date;
  birthCity: string;
  birthCountry: string;
  height: number;

  @Field(() => BirthState)
  birthState: BirthState;
  citizenshipId: string;
  initialTraining: boolean;
  NDA: boolean;
  grade: number;
  orgId: string;

  @Field(() => EyeColor)
  eyeColor: EyeColor;

  @Field(() => Spec)
  spec: Spec;

  @Field(() => Role)
  role: Role;
}
