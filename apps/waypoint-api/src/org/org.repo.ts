import { OrgTier } from '../operations-types';
import { OrgCreateInput } from '@odst/types';

export const TestOrgCreateInput: OrgCreateInput[] = [
  {
    name: '552 ACW',
    aliases: [],
    orgTier: OrgTier.Wing,
  },
  {
    name: '72 ABW',
    aliases: [],
    orgTier: OrgTier.Wing,
  },
  {
    name: '552 ACG',
    aliases: [],
    orgTier: OrgTier.Group,
    parent: {
      connect: {
        name: '552 ACW',
      },
    },
  },
  {
    name: '552 ACNS',
    aliases: [],
    orgTier: OrgTier.Squadron,
    parent: {
      connect: {
        name: '552 ACG',
      },
    },
  },
  {
    name: '552 ACS',
    orgTier: OrgTier.Squadron,
    aliases: [],
    parent: {
      connect: {
        name: '552 ACG',
      },
    },
  },
  {
    name: '552 TRG',
    orgTier: OrgTier.Group,
    aliases: [],
    parent: {
      connect: {
        name: '552 ACW',
      },
    },
  },
  {
    name: '552 TRS',
    orgTier: OrgTier.Squadron,
    aliases: [],
    parent: {
      connect: {
        name: '552 TRG',
      },
    },
  },
];
