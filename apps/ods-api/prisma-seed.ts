/* eslint-disable complexity */
import { PrismaClient, Prisma } from '.prisma/ods/client';
import { PrismaClientKnownRequestError } from '.prisma/ods/client/runtime';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

const orgName = '552 ACNS';
const CCEmail = 'john.doe@us.af.mil';

async function main() {
  const userCreateInputs: Prisma.UserCreateInput[] = [
    {
      email: 'email',
      password: 'password **HASH**',
      firstName: 'Firstname',
      lastName: 'LastName',
      role: 'ADMIN',
    },
    {
      email: 'email',
      password: 'password **HASH**',
      firstName: 'Firstname',
      lastName: 'LastName',
      role: 'ADMIN',
    },
  ];

  userCreateInputs.forEach((user) => {
    prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });
  });

  //#region org
  await prisma.org.upsert({
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
  await prisma.org.upsert({
    where: {
      name: '552 MXS',
    },
    update: {
      orgTier: 'SQUADRON',
    },
    create: {
      name: '552 MXS',
      orgTier: 'SQUADRON',
    },
  });
  await prisma.org.upsert({
    where: {
      name: '752 OSS',
    },
    update: {
      orgTier: 'SQUADRON',
    },
    create: {
      name: '752 OSS',
      orgTier: 'SQUADRON',
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

    await prisma.user.upsert({
      where: {
        email: 'admin@admin.com',
      },
      update: {},
      create: {
        email: 'admin@admin.com',
        password: pw,
        orgs: { connect: { name: 'Scorpion Developers' } },
        role: 'ADMIN',
        firstName: 'Admin',
        lastName: 'Admin',
        grade: 'E-∞',
      },
    });

    await prisma.user.upsert({
      where: {
        email: 'CCEmail',
      },
      update: {},
      create: {
        email: CCEmail,
        password: pw,
        orgs: { connect: { name: orgName } },
        role: 'CC',
        firstName: 'John',
        lastName: 'Doe',
        grade: 'O-6',
      },
    });

    await prisma.user.upsert({
      where: {
        email: 'michael.henry.2@us.af.mil',
      },
      update: {},
      create: {
        email: 'michael.henry.2@us.af.mil',
        password: pw,
        orgs: { connect: { name: '552 MXS' } },
        role: 'CC',
        firstName: 'Michael',
        lastName: 'Henry',
        grade: 'O-6',
      },
    });

    await prisma.user.upsert({
      where: {
        email: 'henry.henderson.99@us.af.mil',
      },
      update: {},
      create: {
        email: 'henry.henderson.99@us.af.mil',
        password: pw,
        orgs: { connect: { name: '752 OSS' } },
        role: 'CC',
        firstName: 'Henry',
        lastName: 'Henderson',
        grade: 'O-6',
      },
    });
  }
  //#endregion user admin

  //#region survey
  //delete existing test surveys
  const orgNames = [
    {
      name: '552 ACNS',
    },
    {
      name: '552 MXS',
    },
    {
      name: '752 OSS',
    },
  ];

  try {
    await prisma.survey.deleteMany({
      where: {
        orgs: {
          some: {
            OR: orgNames,
          },
        },
      },
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
