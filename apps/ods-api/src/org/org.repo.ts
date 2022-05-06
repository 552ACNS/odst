import { OrgCreateInput } from '../__types__/';
import { Org } from '.prisma/ods/client';

export const MockOrgs: Org[] = [
  {
    id: 'org id 1',
    name: 'org name',
    orgTier: 'WING',
    parentId: 'org parent id',
  },
  {
    id: 'org id 2',
    name: 'other org name',
    orgTier: 'WING',
    parentId: 'org parent id',
  },
];

export const MockOrgCreateInput: OrgCreateInput[] = [
  {
    name: '552 ACW',
    orgTier: 'WING',
  },
  {
    name: '72 ABW',
    orgTier: 'WING',
  },
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
    name: '552 ACNS',
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
    parent: {
      connect: {
        name: '552 ACG',
      },
    },
  },
  {
    name: '552 TRG',
    orgTier: 'GROUP',
    parent: {
      connect: {
        name: '552 ACW',
      },
    },
  },
  {
    name: '552 TRS',
    orgTier: 'SQUADRON',
    parent: {
      connect: {
        name: '552 TRG',
      },
    },
  },
];
