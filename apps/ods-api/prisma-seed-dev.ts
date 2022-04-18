/* eslint-disable complexity */
import { PrismaClient } from '.prisma/ods/client';
import { PrismaClientKnownRequestError } from '.prisma/ods/client/runtime';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

const orgName = '552 ACNS';
const CCEmail = 'john.doe@us.af.mil';

async function main() {
  //#region org
  await prisma.org.upsert({
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

  try {
    await prisma.refreshToken.deleteMany({
      where: { user: { email: 'michael.henry.2@us.af.mil' } },
    });
    await prisma.user.delete({ where: { email: 'michael.henry.2@us.af.mil' } });
  } catch (e) {
    //delete can fail if no entities are found. Ignore that
    if (!(e instanceof PrismaClientKnownRequestError)) {
      throw e;
    }
  }

  try {
    await prisma.refreshToken.deleteMany({
      where: { user: { email: 'henry.henderson.99@us.af.mil' } },
    });
    await prisma.user.delete({
      where: { email: 'henry.henderson.99@us.af.mil' },
    });
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

    await prisma.user.create({
      data: {
        email: CCEmail,
        password: pw,
        orgs: { connect: { name: orgName } },
        role: 'CC',
        firstName: 'John',
        lastName: 'Doe',
        rank: 'Lt. Col.',
      },
    });

    await prisma.user.create({
      data: {
        email: 'michael.henry.2@us.af.mil',
        password: pw,
        orgs: { connect: { name: '552 MXS' } },
        role: 'CC',
        firstName: 'Michael',
        lastName: 'Henry',
        rank: 'Lt. Col.',
      },
    });

    await prisma.user.create({
      data: {
        email: 'henry.henderson.99@us.af.mil',
        password: pw,
        orgs: { connect: { name: '752 OSS' } },
        role: 'CC',
        firstName: 'Henry',
        lastName: 'Henderson',
        rank: 'Lt. Col.',
      },
    });
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
