import { BadRequestException, Injectable } from '@nestjs/common';
import {
  Survey,
  Prisma,
  SurveyResponse,
  Question,
  Org,
} from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class SurveyService {
  constructor(private prisma: PrismaService) {}

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SurveyWhereUniqueInput;
    where?: Prisma.SurveyWhereInput;
    orderBy?: Prisma.SurveyOrderByWithRelationInput;
  }): Promise<Survey[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.survey.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findUnique(
    surveyWhereUniqueInput: Prisma.SurveyWhereUniqueInput
  ): Promise<Survey | null> {
    return this.prisma.survey.findUnique({
      where: surveyWhereUniqueInput,
    });
  }

  async createWithQuestions(
    questionPrompts: string[],
    orgWhereUniqueInput: Prisma.OrgWhereUniqueInput
  ): Promise<Survey> {
    if (questionPrompts.length <= 0) {
      throw new BadRequestException('No question prompts provided');
    }
    const questionIds: string[] = [];

    //Could not resolve questions and only hash by string, since it's unique also
    for (const prompt of questionPrompts) {
      //don't use forEach,etc. awaits won't act as expected
      questionIds.push(
        (
          await this.prisma.question.upsert({
            where: { prompt },
            create: { prompt },
            update: {},
          })
        ).id
      );
    }

    const questionsHash = getArrayHash(questionIds);

    return this.prisma.survey.upsert({
      where: { questionsHash },
      create: {
        questionsHash,
        questions: { connect: questionIds.map((id) => ({ id })) },
        orgs: { connect: [orgWhereUniqueInput] },
      },
      update: {
        orgs: { connect: [orgWhereUniqueInput] },
      },
    });
  }

  async create(data: Prisma.SurveyCreateInput): Promise<Survey> {
    const survey = await this.prisma.survey.create({
      data,
    });

    await this.updateQuestionsHash({ id: survey.id });

    return survey;
  }

  async update(
    data: Prisma.SurveyUpdateInput,
    where: Prisma.SurveyWhereUniqueInput
  ): Promise<Survey> {
    const survey = await this.prisma.survey.update({ data, where });

    if (survey.id) {
      await this.updateQuestionsHash({ id: survey.id });
    }

    return survey;
  }

  async delete(
    orgWhereUniqueInput: Prisma.SurveyWhereUniqueInput
  ): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.prisma.survey.delete({
        where: orgWhereUniqueInput,
      });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  //TODO optimize database calls. each survey create/update requires 3 database calls.
  //TODO only call if questions is being updated
  //TODO move this to prisma hook
  private async updateQuestionsHash(
    surveyWhereUniqueInput: Prisma.SurveyWhereUniqueInput
  ): Promise<void> {
    const questions = await this.prisma.question.findMany({
      where: { surveys: { every: surveyWhereUniqueInput } },
    });

    const questionStr = questions.map((question) => question.id);
    const questionsHash = getArrayHash(questionStr);

    await this.prisma.survey.update({
      where: surveyWhereUniqueInput,
      data: { questionsHash },
    });
  }

  async orgs(
    surveyWhereUniqueInput: Prisma.SurveyWhereUniqueInput
  ): Promise<Org[]> {
    return this.prisma.survey
      .findUnique({ where: surveyWhereUniqueInput })
      .orgs();
  }

  async questions(
    surveyWhereUniqueInput: Prisma.SurveyWhereUniqueInput
  ): Promise<Question[]> {
    return this.prisma.survey
      .findUnique({ where: surveyWhereUniqueInput })
      .questions();
  }

  async surveyResponses(
    surveyWhereUniqueInput: Prisma.SurveyWhereUniqueInput
  ): Promise<SurveyResponse[]> {
    return this.prisma.survey
      .findUnique({ where: surveyWhereUniqueInput })
      .surveyResponses();
  }
  //TODO tests for new methods
}
function getArrayHash(stringArray: string[]): string {
  return stringArray.length > 0
    ? crypto
        .createHash('sha256')
        .update(stringArray.sort().join())
        .digest('hex')
    : '';
}
