import { BadRequestException, Injectable } from '@nestjs/common';
import {
  Feedback,
  Prisma,
  FeedbackResponse,
  Question,
  Org,
} from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  async findUnique(
    feedbackWhereUniqueInput: Prisma.FeedbackWhereUniqueInput
  ): Promise<Feedback | null> {
    return this.prisma.feedback.findUnique({
      where: feedbackWhereUniqueInput,
    });
  }

  //TODO write tests for this
  async createWithQuestions(
    questionValues: string[],
    orgWhereUniqueInput: Prisma.OrgWhereUniqueInput
  ): Promise<{ id: string }> {
    if (questionValues.length <= 0) {
      throw new BadRequestException('No question values provided');
    }
    const questionIds: string[] = [];

    //Could not resolve questions and only hash by string, since it's unique also
    for (const value of questionValues) {
      //don't use forEach,etc. awaits won't act as expected
      questionIds.push(
        (
          await this.prisma.question.upsert({
            where: { value },
            create: { value },
            update: {},
          })
        ).id
      );
    }

    const questionsHash = getArrayHash(questionIds);

    return this.prisma.feedback.upsert({
      where: { questionsHash },
      create: {
        questionsHash,
        questions: { connect: questionIds.map((id) => ({ id })) },
        orgs: { connect: [orgWhereUniqueInput] },
      },
      update: {
        orgs: { connect: [orgWhereUniqueInput] },
      },
      select: { id: true },
    });
  }

  async update(
    data: Prisma.FeedbackUpdateInput,
    where: Prisma.FeedbackWhereUniqueInput
  ): Promise<Feedback> {
    const feedback = await this.prisma.feedback.update({ data, where });

    if (feedback.id) {
      await this.updateQuestionsHash({ id: feedback.id });
    }
    // TODO [ODST-294]: What if the feedback is not found? What does it do?
    return feedback;
  }

  //TODO [ODST-295] optimize database calls. each feedback create/update requires 3 database calls.
  //TODO [ODST-296] only call if questions is being updated
  //TODO [ODST-297] move this to prisma hook
  private async updateQuestionsHash(
    feedbackWhereUniqueInput: Prisma.FeedbackWhereUniqueInput
  ): Promise<void> {
    const questions = await this.prisma.question.findMany({
      where: { feedbacks: { every: feedbackWhereUniqueInput } },
    });

    const questionStr = questions.map((question) => question.id);
    const questionsHash = getArrayHash(questionStr);

    await this.prisma.feedback.update({
      where: feedbackWhereUniqueInput,
      data: { questionsHash },
    });
  }

  async orgs(
    feedbackWhereUniqueInput: Prisma.FeedbackWhereUniqueInput
  ): Promise<Org[] | null> {
    return this.prisma.feedback
      .findUnique({ where: feedbackWhereUniqueInput })
      .orgs();
  }

  async questions(
    feedbackWhereUniqueInput: Prisma.FeedbackWhereUniqueInput
  ): Promise<Question[] | null> {
    return this.prisma.feedback
      .findUnique({ where: feedbackWhereUniqueInput })
      .questions();
  }

  async feedbackResponses(
    feedbackWhereUniqueInput: Prisma.FeedbackWhereUniqueInput
  ): Promise<FeedbackResponse[] | null> {
    return this.prisma.feedback
      .findUnique({ where: feedbackWhereUniqueInput })
      .feedbackResponses();
  }
  //TODO [ODST-298] write tests for getArrayHash
}

function getArrayHash(stringArray: string[]): string {
  return stringArray.length > 0
    ? crypto
        .createHash('sha256')
        .update(stringArray.sort().join())
        .digest('hex')
    : '';
}
