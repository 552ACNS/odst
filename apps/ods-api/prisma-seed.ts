/* eslint-disable complexity */
import { PrismaClient, Prisma } from '.prisma/ods/client';
import { PrismaClientKnownRequestError } from '.prisma/ods/client/runtime';
import { hash } from 'bcryptjs';

//TODO refactor to not repeat code so much(DRY) - like the org/tag are done

const prisma = new PrismaClient();

const orgSeed: Prisma.OrgCreateInput[] = [
  // ADMIN
  {
    name: 'Scorpion Developers',
    orgTier: 'OTHER',
  },
  // Wings
  {
    name: '552 ACW',
    orgTier: 'WING',
  },
  {
    name: '72 ABW',
    orgTier: 'WING',
  },
  // Groups
  {
    name: '552 ACG',
    orgTier: 'GROUP',
    parent: {
      connect: {
        name: '552 ACW',
      },
    },
  },
  {
    name: '72 MDG',
    orgTier: 'GROUP',
    parent: {
      connect: {
        name: '72 ABW',
      },
    },
  },
  {
    name: '552 MXG',
    orgTier: 'GROUP',
    parent: {
      connect: {
        name: '552 ACW',
      },
    },
  },
  {
    name: '552 ACNS',
    orgTier: 'SQUADRON',
    parent: {
      connect: {
        name: '552 ACG',
      },
    },
  },
  {
    name: '552 MXS',
    orgTier: 'SQUADRON',
    parent: {
      connect: {
        name: '552 MXG',
      },
    },
  },
  {
    name: '752 OSS',
    orgTier: 'SQUADRON',
    parent: {
      connect: {
        name: '552 ACG',
      },
    },
  },
];

const tagSeed: Prisma.TagCreateInput[] = [
  // Data tracking tags
  { value: 'Gender', type: 'Resolution' },
  { value: 'Sexism', type: 'Resolution' },
  { value: 'Race', type: 'Resolution' },
  { value: 'Racism', type: 'Resolution' },
  { value: 'Sexuality', type: 'Resolution' },
  { value: 'Gender Identity', type: 'Resolution' },
  { value: 'Religion', type: 'Resolution' },
  { value: 'Mental Health', type: 'Resolution' },
  { value: 'Minority', type: 'Resolution' },
  { value: 'Marginalized', type: 'Resolution' },
  { value: 'Mental Illness', type: 'Resolution' },
  { value: 'Rank', type: 'Resolution' },
  { value: 'Observed', type: 'Resolution' },
  { value: 'Experienced', type: 'Resolution' },
  { value: 'Other', type: 'Resolution' },
  { value: 'Harassment', type: 'Resolution' },
  { value: 'Assault', type: 'Resolution' },
  { value: 'Discrimination', type: 'Resolution' },

  // Action tags
  { value: 'Addressed in organizational all-call', type: 'Action' },
  { value: 'Spoke with organizational leadership', type: 'Action' },
  { value: 'Brought in external agency to educate', type: 'Action' },
  { value: 'Offered educational workshops', type: 'Action' },
  { value: 'Distributed educational material', type: 'Action' },
  { value: 'Routed up the chain of command', type: 'Action' },
];

async function main() {
  // Upsert Orgs
  for (const org of orgSeed) {
    try {
      await prisma.org.upsert({
        where: {
          name: org.name,
        },
        update: {
          name: org.name,
          orgTier: org.orgTier,
          parent: org.parent,
        },
        create: {
          name: org.name,
          orgTier: org.orgTier,
          parent: org.parent,
        },
      });
    } catch (e) {
      if (!(e instanceof PrismaClientKnownRequestError)) {
        throw e;
      }
    }
  }
  // Upsert Tags
  for (const tag of tagSeed) {
    try {
      await prisma.tag.upsert({
        where: {
          value: tag.value,
        },
        update: {
          value: tag.value,
        },
        create: {
          value: tag.value,
          type: tag.type,
        },
      });
    } catch (e) {
      if (!(e instanceof PrismaClientKnownRequestError)) {
        throw e;
      }
    }
  }

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
      where: { user: { email: 'emmanuel.matos@us.af.mil' } },
    });
    await prisma.user.delete({ where: { email: 'emmanuel.matos@us.af.mil' } });
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
        status: 'ENABLED',
      },
    });

    await prisma.user.upsert({
      where: {
        email: 'kenneth.voigt@us.af.mil',
      },
      update: {},
      create: {
        email: 'kenneth.voigt@us.af.mil',
        password: pw,
        orgs: { connect: { name: '552 ACG' } },
        role: 'CC',
        firstName: 'Kenneth',
        lastName: 'Voigt',
        grade: 'O-6',
        status: 'ENABLED',
      },
    });

    await prisma.user.upsert({
      where: {
        email: 'keven.coyle@us.af.mil',
      },
      update: {},
      create: {
        email: 'keven.coyle@us.af.mil',
        password: pw,
        orgs: { connect: { name: '552 ACW' } },
        role: 'CC',
        firstName: 'Keven',
        lastName: 'Coyle',
        grade: 'O-6',
        status: 'ENABLED',
      },
    });

    await prisma.user.upsert({
      where: {
        email: 'emmanuel.matos@us.af.mil',
      },
      update: {},
      create: {
        email: 'emmanuel.matos@us.af.mil',
        password: pw,
        orgs: { connect: { name: '552 ACNS' } },
        role: 'CC',
        firstName: 'Emmanuel',
        lastName: 'Matos',
        grade: 'O-5',
        status: 'ENABLED',
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
        grade: 'O-5',
        status: 'REQUESTED',
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
        grade: 'O-5',
        status: 'ENABLED',
      },
    });
  }
  //#endregion user admin

  //#region feedback
  //delete existing test feedbacks
  const orgNames = orgSeed.map((o) => {
    return { name: o.name };
  });

  try {
    await prisma.feedback.deleteMany({
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
