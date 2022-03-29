import { OrgCreateInput } from '@odst/types/waypoint';

export const TestOrgCreateInput: OrgCreateInput[] = [
  {
    name: '552 ACW',
    aliases: [],
    orgTier: 'WING',
  },
  {
    name: '72 ABW',
    aliases: [],
    orgTier: 'WING',
  },
  {
    name: '552 ACG',
    aliases: [],
    orgTier: 'GROUP',
    parent: {
      connect: {
        name: '552 ACW',
      },
    },
  },
  {
    name: '552 ACNS',
    aliases: [],
    orgTier: 'SQUADRON',
    parent: {
      connect: {
        name: '552 ACG',
      },
    },
  },
  {
    name: '552 ACS',
    orgTier: 'SQUADRON',
    aliases: [],
    parent: {
      connect: {
        name: '552 ACG',
      },
    },
  },
  {
    name: '552 TRG',
    orgTier: 'GROUP',
    aliases: [],
    parent: {
      connect: {
        name: '552 ACW',
      },
    },
  },
  {
    name: '552 TRS',
    orgTier: 'SQUADRON',
    aliases: [],
    parent: {
      connect: {
        name: '552 TRG',
      },
    },
  },
];
