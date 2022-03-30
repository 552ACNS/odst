import { PrismaClient } from '.prisma/ods/client';
import { PrismaClientKnownRequestError } from '.prisma/ods/client/runtime';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

const orgName = '552 ACNS';
const CCEmail = 'john.doe@us.af.mil';

async function main() {
  //#region org
  const org = await prisma.org.upsert({
    where: {
      name: orgName,
    },
    update: {
      orgTier: 'SQUADRON',
    },
    create: {
      name: orgName,
      orgTier: 'SQUADRON',
    },
  });
  //#endregion

  //#region user admin
  //delete existing user
  try {
    await prisma.refreshToken.deleteMany({
      where: { user: { email: CCEmail } },
    });
    await prisma.user.delete({ where: { email: CCEmail } });
  } catch (e) {
    //delete can fail if no entities are found. Ignore that
    if (!(e instanceof PrismaClientKnownRequestError)) {
      throw e;
    }
  }

  if (
    process.env.NODE_ENV !== 'PRODUCTION' &&
    process.env.NX_DEV_ACCOUNT_PASSWORD
  ) {
    const pw = await hash(process.env.NX_DEV_ACCOUNT_PASSWORD, 10);

    const user = await prisma.user.create({
      data: {
        email: CCEmail,
        password: pw,
        orgs: { connect: { name: orgName } },
        roles: 'CC',
      },
    });
    console.log({ user });
  }
  //#endregion user admin

  //#region survey
  //delete existing test surveys
  try {
    await prisma.survey.deleteMany({
      where: { orgs: { every: { name: orgName } } },
    });
  } catch (e) {
    //delete can fail if no entities are found. Ignore that
    if (!(e instanceof PrismaClientKnownRequestError)) {
      throw e;
    }
  }

  const survey = await prisma.survey.create({
    data: {
      orgs: { connect: { name: orgName } },
    },
  });
  //#endregion survey

  //#region answer
  const question = await prisma.question.create({
    data: {
      prompt: 'Which squadron did the event occur in?',
      surveys: { connect: { id: survey.id } },
    },
  });
  //#endregion answer

  //#region answer
  const surveyResponse = await prisma.surveyResponse.create({
    data: {
      survey: { connect: { id: survey.id } },
    },
  });
  //#endregion answer

  //#region answer
  const answer = await prisma.answer.create({
    data: {
      value: orgName,
      question: { connect: { id: question.id } },
      surveyResponse: { connect: { id: surveyResponse.id } },
    },
  });
  //#endregion answer

  console.log({ org, survey, surveyResponse, question, answer });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });