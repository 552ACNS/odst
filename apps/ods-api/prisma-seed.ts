import { PrismaClient } from '.prisma/ods/client';
import { PrismaClientKnownRequestError } from '.prisma/ods/client/runtime';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  //#region org
  const org = await prisma.org.upsert({
    where: {
      name: 'Scorpion Developers',
    },
    update: {
      orgTier: 'OTHER',
    },
    create: {
      name: 'Scorpion Developers',
      orgTier: 'OTHER',
    },
  });
  //#endregion

  //#region user admin
  //delete existing user
  try {
    await prisma.refreshToken.deleteMany({
      where: { user: { email: 'admin@admin.com' } },
    });
    await prisma.user.delete({ where: { email: 'admin@admin.com' } });
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
        email: 'admin@admin.com',
        password: pw,
        orgs: { connect: { name: 'Scorpion Developers' } },
        roles: 'ADMIN',
      },
    });
    console.log({ user });
  }
  //#endregion user admin

  //#region survey
  //delete existing test surveys
  try {
    await prisma.survey.deleteMany({
      where: { orgs: { every: { name: 'Scorpion Developers' } } },
    });
  } catch (e) {
    //delete can fail if no entities are found. Ignore that
    if (!(e instanceof PrismaClientKnownRequestError)) {
      throw e;
    }
  }

  const survey = await prisma.survey.create({
    data: {
      orgs: { connect: { name: 'Scorpion Developers' } },
      questions: {
        createMany: {
          data: [
            { prompt: 'What is the meaning of life?' },
            { prompt: 'Am I alive?' },
          ],
        },
      },
    },
  });
  //#endregion survey

  console.log({ org, survey });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
