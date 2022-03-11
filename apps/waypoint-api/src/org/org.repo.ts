import { OrgCreateInput } from '@odst/types';
import{ OrgTier } from '@prisma/client'

export const TestOrgCreateInput: OrgCreateInput[] = [
  {
    name: '552 ACW',
    aliases: [],
    orgTier: OrgTier.WING,
  },
  {
    name: '72 ABW',
    aliases: [],
    orgTier: OrgTier.WING,
  },
  {
    name: '552 ACG',
    aliases: [],
    orgTier: OrgTier.GROUP,
    parent: {
      connect: {
        name: '552 ACW',
      },
    },
  },
  {
    name: '552 ACNS',
    aliases: [],
    orgTier: OrgTier.SQUADRON,
    parent: {
      connect: {
        name: '552 ACG',
      },
    },
  },
  {
    name: '552 ACS',
    orgTier: OrgTier.SQUADRON,
    aliases: [],
    parent: {
      connect: {
        name: '552 ACG',
      },
    },
  },
  {
    name: '552 TRG',
    orgTier: OrgTier.GROUP,
    aliases: [],
    parent: {
      connect: {
        name: '552 ACW',
      },
    },
  },
  {
    name: '552 TRS',
    orgTier: OrgTier.SQUADRON,
    aliases: [],
    parent: {
      connect: {
        name: '552 TRG',
      },
    },
  },
];
