import { Injectable } from '@nestjs/common';
import { Org, Prisma, User, Feedback, OrgTier } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrgService {
  constructor(private prisma: PrismaService) {}

  async getUserOrgsNames(user: User): Promise<string[]> {
    return this.prisma.org
      .findMany({
        select: {
          name: true,
        },
        where: {
          users: {
            some: {
              id: user.id,
            },
          },
        },
      })
      .then((responses) => responses.map((response) => response.name));
  }

  // eslint-disable-next-line complexity
  async createOrg(
    user: User,
    data: Prisma.OrgCreateInput
  ): Promise<{ id: string }> {
    const authorizedToCreateOrg = await this.isAuthorizedToCreateOrg(
      user,
      data.orgTier
    );

    if (authorizedToCreateOrg) {
      return this.prisma.org.create({
        data,
        select: { id: true },
      });
    }
    throw new Error('User is not authorized to create org');
  }

  async updateOrg(
    where: Prisma.OrgWhereUniqueInput,
    data: Prisma.OrgUpdateInput
  ): Promise<Org> {
    return this.prisma.org.update({
      where: where,
      data: data,
    });
  }

  async getTiersByUser(user: User): Promise<string[]> {
    const userOrgTier = await this.prisma.org
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
      if (userOrgTier.includes(OrgTier.WING)) {
        return ['GROUP', 'SQUADRON', 'OTHER'];
      } else if (userOrgTier.includes(OrgTier.GROUP)) {
        return ['SQUADRON', 'OTHER'];
      } else {
        return ['OTHER'];
      }
    } else {
      return ['WING', 'GROUP', 'SQUADRON', 'OTHER'];
    }
  }

  // eslint-disable-next-line complexity
  async isAuthorizedToCreateOrg(
    user: User,
    orgTier: OrgTier
  ): Promise<boolean> {
    let authorizedToCreateOrg = false;

    const userOrgTier = await this.prisma.org
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
        (userOrgTier.includes(OrgTier.GROUP) && orgTier == OrgTier.SQUADRON) ||
        (userOrgTier.includes(OrgTier.WING) && orgTier == OrgTier.GROUP) ||
        (userOrgTier.includes(OrgTier.WING) && orgTier == OrgTier.SQUADRON)
      ) {
        authorizedToCreateOrg = true;
      } else if (orgTier == OrgTier.OTHER) {
        authorizedToCreateOrg = true;
      }
    } else {
      authorizedToCreateOrg = true;
    }
    return authorizedToCreateOrg;
  }

  async getOrgChildren(name: string): Promise<string[]> {
    return this.prisma.org
      .findMany({
        select: {
          name: true,
        },
        where: {
          parent: {
            name: {
              equals: name,
            },
          },
        },
      })
      .then((children) => children.map((children) => children.name));
  }

  async getOrgTier(name: string): Promise<OrgTier | string | undefined> {
    return this.prisma.org
      .findUnique({
        where: {
          name: name,
        },
      })
      .then((org) => org?.orgTier);
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
        return result;
      default:
        return (temp = ['N/A']);
    }
    // eslint-disable-next-line prefer-const

    //TODO: see if we want orgs that already have parents not appear
    result = this.prisma.org
      .findMany({
        select: {
          name: true,
        },
        where: {
          orgTier: temp,
          AND: {
            parent: {
              is: null,
            },
          },
        },
      })
      .then((responses) => responses.map((response) => response.name));
    return result;
  }

  async getOrgsBelowTierWithKeepParents(tier: OrgTier): Promise<string[]> {
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
    return result;
  }

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
