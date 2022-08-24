import { Injectable } from '@nestjs/common';
import { Org, Prisma, User, Feedback, OrgTier } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrgService {
  constructor(private prisma: PrismaService) {}
  //TODO: Create separate method to determine if user is authorized to create org
  //TODO: Talk with sim about connecting orgs to users as well
  // eslint-disable-next-line complexity
  async createOrg(
    user: User,
    name: string,
    orgTier: OrgTier,
    parentId: string | undefined,
    children: Org[]
  ): Promise<Org | undefined> {
    const authorizedToCreateOrg = await this.isAuthorizedToCreateOrg(
      user,
      orgTier
    );

    if (authorizedToCreateOrg) {
      return this.prisma.org.create({
        data: {
          name,
          orgTier,
          parent: {
            connect: {
              id: parentId,
            },
          },
          children: {
            connect: children.map((child) => ({ id: child.id })),
          },
        },
      });
    } else return undefined;
  }

  // eslint-disable-next-line complexity
  async isAuthorizedToCreateOrg(
    user: User,
    orgTier: OrgTier
  ): Promise<boolean> {
    let authorizedToCreateOrg = false;

    const blah = await this.prisma.org
      .findMany({
        select: {
          orgTier: true,
        },
        where: {
          users: {
            some: {
              id: user.id,
            },
          },
        },
      })
      .then((orgs) => orgs.map((org) => org.orgTier));

    if (user.role == 'CC') {
      if (
        (blah.includes(OrgTier.GROUP) && orgTier == OrgTier.SQUADRON) ||
        (blah.includes(OrgTier.WING) && orgTier == OrgTier.GROUP) ||
        (blah.includes(OrgTier.WING) && orgTier == OrgTier.SQUADRON)
      ) {
        authorizedToCreateOrg = true;
      } else {
        authorizedToCreateOrg = true;
      }
    }

    return authorizedToCreateOrg;
  }

  async getOrgsBelowTier(tier: OrgTier): Promise<string[]> {
    let temp;
    let result;
    switch (tier) {
      case 'GROUP':
        temp = { equals: 'SQUADRON' };
        break;
      case 'WING':
        temp = { equals: 'GROUP' };
        break;
      case 'OTHER':
        result = this.prisma.org
          .findMany({
            select: {
              name: true,
            },
          })
          .then((responses) => responses.map((response) => response.name));
        //TODO: fix the push thingy
        //result.push('N/A');
        return result;
      default:
        return (temp = ['N/A']);
    }
    // eslint-disable-next-line prefer-const
    result = this.prisma.org
      .findMany({
        select: {
          name: true,
        },
        where: {
          orgTier: temp,
        },
      })
      .then((responses) => responses.map((response) => response.name));
    //result.push('N/A');
    return result;
  }

  async getOrgsAboveTier(tier: OrgTier): Promise<string[]> {
    let temp;
    let result;
    switch (tier) {
      case 'GROUP':
        temp = { equals: 'WING' };
        break;
      case 'SQUADRON':
        temp = { equals: 'GROUP' };
        break;
      case 'OTHER':
        result = this.prisma.org
          .findMany({
            select: {
              name: true,
            },
          })
          .then((responses) => responses.map((response) => response.name));
        //result.push('N/A');
        return result;
      default:
        return (temp = ['N/A']);
    }
    // eslint-disable-next-line prefer-const
    result = this.prisma.org
      .findMany({
        select: {
          name: true,
        },
        where: {
          orgTier: temp,
        },
      })
      .then((responses) => responses.map((response) => response.name));
    //result.push('N/A');
    return result;
  }

  // async getOrgTiers(): Promise<string[]> {

  // }

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
