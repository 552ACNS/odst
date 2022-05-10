import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import {
  CommentCreateNestedManyWithoutSurveyResponseInput,
  CommentCreateWithoutSurveyResponseInput,
} from './comment.create.input';
@InputType()
export class SurveyResponseUpdateInput
  implements Prisma.SurveyResponseUpdateInput
{
  closedDate?: Date;

  // If this is included in update, make sure not anyone can change it,
  // so a CC can't come in and route something to themself that they shouldn't be seen
  //TODO Org Guard
  routeOutside?: boolean;
  @Field(() => CommentCreateWithoutSurveyResponseInput)
  comments?: Prisma.CommentCreateNestedManyWithoutSurveyResponseInput;
}
