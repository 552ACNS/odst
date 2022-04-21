import { Resolver, Parent, ResolveField, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { OrgGQL, UserGQL } from '@odst/types/ods';
// fix this when we have a better solution
// eslint-disable-next-line no-restricted-imports
import { Role } from '.prisma/ods/client';
import { Logger } from '@nestjs/common';
import { FieldMap } from '@jenyus-org/nestjs-graphql-utils';
import { FieldMap as FieldMapType } from '@jenyus-org/graphql-utils';

@Resolver(() => UserGQL)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  //forget why I did this on findManyUsers
  @Query(() => [UserGQL], { name: 'findManyUsers' })
  //at least it isn't :Promise<any>
  async findManyUsers(@FieldMap() fieldMap: FieldMapType): Promise<unknown> {
    Logger.log('fields requested by graphql');
    Logger.log(fieldMap);

    //going into fieldMap to get fields
    //only the safest of types
    const fields: any = Object.values(fieldMap)[0];

    for (const k in fields) {
      if (Object.keys(fields[k]).length === 0) {
        fields[k] = true;
      } else {
        //delete nested fields, which will be resolved later
        delete fields[k];
      }
    }
    //not including id breaks graphql ResolveFields
    fields['id'] = true;

    Logger.log('fields requested by prisma');
    Logger.log(fields);
    return this.userService.findMany({ select: fields });

    //origonal raw sql executed
    //SELECT "public"."User"."id", "public"."User"."role" FROM "public"."User" WHERE 1=1 OFFSET $1 [0]

    //modified raw sql executed
    //SELECT "public"."User"."id", "public"."User"."email", "public"."User"."password", "public"."User"."enabled", "public"."User"."rank", "public"."User"."firstName", "public"."User"."lastName", "public"."User"."role" FROM "public"."User" WHERE 1=1 OFFSET $1 [0]
  }

  @Query(() => [UserGQL], { name: 'findUsersWithRole' })
  async findUsersWithRole(@Args('role') role: Role): Promise<UserGQL[]> {
    return this.userService.findUsersWithRole(role);
  }

  @ResolveField(() => [OrgGQL])
  async orgs(@Parent() user: UserGQL) {
    return this.userService.orgs({ id: user.id });
  }
}
