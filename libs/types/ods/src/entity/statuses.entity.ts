import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class statuses {
  unresolved: string[];
  resolved: string[];
  overdue: string[];
}
