import { Tag } from '.prisma/ods/client';

export const MockTags: Tag[] = [
  { id: '1', value: 'Tag 1', type: 'Action' },
  { id: '2', value: 'Tag 2', type: 'Action' },
  { id: '3', value: 'Tag 3', type: 'Action' },
  { id: '4', value: 'Tag 4', type: 'Resolution' },
  { id: '5', value: 'Tag 5', type: 'Resolution' },
  { id: '6', value: 'Tag 6', type: 'Resolution' },
];
