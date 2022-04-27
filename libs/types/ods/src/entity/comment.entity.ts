import { ObjectType, HideField } from '@nestjs/graphql';
import { Comment } from '.prisma/ods/client';

@ObjectType()
export class CommentGQL implements Comment {
  id: string;
  value: string;
  date: Date;

  @HideField()
  authorId: string;

  @HideField()
  surveyResponseId: string;
}
