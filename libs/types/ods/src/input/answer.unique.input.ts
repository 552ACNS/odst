import { InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';

@InputType()
export class AnswerWhereUniqueInput implements Prisma.AnswerWhereUniqueInput {
  id?: string;
}
