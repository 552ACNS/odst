import {
  BadRequestException,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import { Org, Prisma, User, Feedback, OrgTier } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';
//import { FindManyOrgArgs, OrgWhereInput } from '@odst/types/ods';

@Injectable()
export class OrgService {
  constructor(private prisma: PrismaService) {}

  async getUserOrgsNames(user: User): Promise<string[]> {
    const temp = this.prisma.org
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
    // (await temp).forEach(async (parentOrg) => {
    return temp;
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

  // eslint-disable-next-line complexity
  async getOrgsBelowTier(tier: OrgTier): Promise<string[]> {
    let tempTier;

    switch (tier) {
      case 'WING':
        tempTier = { equals: 'GROUP' };
        break;
      case 'GROUP':
        tempTier = { equals: 'SQUADRON' };
        break;
      case 'SQUADRON':
        return [];
      case 'OTHER':
        tempTier = [];
        break;
      default:
        throw new NotImplementedException();
    }
    return this.prisma.org
      .findMany({
        select: {
          name: true,
        },
        where: {
          orgTier: tempTier,
          AND: {
            parent: {
              is: null,
            },
          },
        },
      })
      .then((responses) => responses.map((response) => response.name));
  }

  // eslint-disable-next-line complexity
  async getOrgsBelowTierWithKeepParents(tier: OrgTier): Promise<string[]> {
    let tempTier;

    switch (tier) {
      case 'WING':
        tempTier = { equals: 'GROUP' };
        break;
      case 'GROUP':
        tempTier = { equals: 'SQUADRON' };
        break;
      case 'SQUADRON':
        return [];
      case 'OTHER':
        tempTier = [];
        break;

      default:
        throw new NotImplementedException();
    }
    return this.prisma.org
      .findMany({
        select: {
          name: true,
        },
        where: {
          orgTier: tempTier,
        },
      })
      .then((responses) => responses.map((response) => response.name));
  }

  // eslint-disable-next-line complexity
  async getOrgsAboveTier(tier: OrgTier): Promise<string[]> {
    let tempTier;
    switch (tier) {
      case 'WING':
        return [];
      case 'GROUP':
        tempTier = { equals: 'WING' };
        break;
      case 'SQUADRON':
        tempTier = { equals: 'GROUP' };
        break;
      case 'OTHER':
        tempTier = [];
        break;
      default:
        throw new NotImplementedException();
    }
    // eslint-disable-next-line prefer-const
    return this.prisma.org
      .findMany({
        select: {
          name: true,
        },
        where: {
          orgTier: tempTier,
        },
      })
      .then((responses) => responses.map((response) => response.name));
  }

  async checkOrg(orgName: string): Promise<boolean> {
    return this.prisma.org
      .findUnique({
        where: {
          name: orgName,
        },
      })
      .then((org) => {
        if (org) {
          return true;
        } else {
          return false;
        }
      });
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

  async deleteOrg(
    orgWhereUniqueInput: Prisma.OrgWhereUniqueInput
  ): Promise<Org | null> {
    let deletedOrg: Org | null = null;

    try {
      deletedOrg = await this.prisma.org.delete({
        where: orgWhereUniqueInput,
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(err?.meta?.cause);
      }
    }
    return deletedOrg;
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
