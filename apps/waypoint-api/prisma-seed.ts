/* eslint-disable complexity */
import { PrismaClient } from '.prisma/waypoint/client';
import { PrismaClientKnownRequestError } from '.prisma/waypoint/client/runtime';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const org = await prisma.org.upsert({
    where: {
      name: 'Scorpion Developers',
    },
    update: {
      aliases: ['scorpions'],
      orgTier: 'OTHER',
    },
    create: {
      name: 'Scorpion Developers',
      aliases: ['scorpions'],
      orgTier: 'OTHER',
    },
  });

  const person = await prisma.person.upsert({
    where: { dodId: 100000000 },
    update: { org: { connect: { name: org.name } } },
    create: {
      dodId: 100000000,
      ssn: 100000000,
      email: 'dev_admin_account@dev_admin_account',
      hairColor: 'BROWN',
      birthState: 'AK',
      eyeColor: 'BROWN',
      spec: 'OTHER',
      role: 'DEV',
      firstName: 'dev_admin_account',
      lastName: 'dev_admin_account',
      birthDate: new Date('1/1/1990'),
      org: { connect: { name: org.name } },
      grade: 1,
      NDA: false,
      initialTraining: false,
      citizenshipId: 'dev_admin_account',
      height: 1,
      birthCountry: 'dev_admin_account',
      birthCity: 'dev_admin_account',
    },
  });
  try {
    await prisma.refreshToken.deleteMany({
      where: { user: { username: 'admin' } },
    });
    await prisma.user.delete({ where: { username: 'admin' } });
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
        username: 'admin',
        password: pw,
        person: { connect: { dodId: person.dodId } },
        enabled: true,
      },
    });
    console.log({ org, person, user });
  } else {
    console.log({ org, person });
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
