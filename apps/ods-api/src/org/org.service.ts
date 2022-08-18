import { Injectable } from '@nestjs/common';
import { Org, Prisma, User, Feedback } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrgService {
  constructor(private prisma: PrismaService) {}

  async getOrgNames(): Promise<string[]> {
    return this.prisma.org
      .findMany({
        select: {
          name: true,
        },
      })
      .then((responses) => responses.map((response) => response.name));
  }

  //TODO write tests for this
  /**
   *
   * @returns a list of Org Names that are descendents from a given org.
   * TODO: accept method parameter for organization name. Right now is hardcoded to '552 ACW'
   */
  async getLineage(): Promise<string[]> {
    const orgs = await this.prisma.org.findMany({
      where: {
        name: {
          in: ['72 ABW', '552 ACW'],
        },
      },
      include: {
        children: {
          select: {
            name: true,
            children: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return this.getFamily(orgs);
  }

  //TODO write tests for this
  getFamily<T extends { name: string; children: any[] }>(orgs: T[]): string[] {
    const orgNames: string[] = [];

    // for each org in the list
    orgs.forEach((org) => {
      // add the org name to the list of orgnames
      orgNames.push(org.name);

      // if the org has children
      if (org.children) {
        // get the family of the children
        this.getFamily(org.children).forEach((child) => {
          // then for each child of the children, add the name to the return list
          orgNames.push(child);
        });
      }
    });

    return orgNames;
  }

  async users(
    orgWhereUniqueInput: Prisma.OrgWhereUniqueInput
  ): Promise<User[]> {
    return this.prisma.org.findUnique({ where: orgWhereUniqueInput }).users();
  }

  async children(
    orgWhereUniqueInput: Prisma.OrgWhereUniqueInput
  ): Promise<Org[]> {
    return this.prisma.org
      .findUnique({ where: orgWhereUniqueInput })
      .children();
  }

  async parent(
    orgWhereUniqueInput: Prisma.OrgWhereUniqueInput
  ): Promise<Org | null> {
    return this.prisma.org.findUnique({ where: orgWhereUniqueInput }).parent();
  }

  async feedbacks(
    orgWhereUniqueInput: Prisma.OrgWhereUniqueInput
  ): Promise<Feedback[]> {
    return this.prisma.org
      .findUnique({ where: orgWhereUniqueInput })
      .feedbacks();
  }
}
