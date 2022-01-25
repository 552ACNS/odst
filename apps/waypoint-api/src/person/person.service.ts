import { Injectable } from '@nestjs/common';
import { Prisma, Person } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PersonService {
  constructor(private prisma: PrismaService) {}

  async person(
    personWhereUniqueInput: Prisma.PersonWhereUniqueInput
  ): Promise<Person | null> {
    return this.prisma.person.findUnique({
      where: personWhereUniqueInput,
    });
  }

  // TODO: Reimplement this once we have auth
  async findManyInOrg(
    personWhereUniqueInput: Prisma.PersonWhereUniqueInput
  ): Promise<Person[]> {
    // Creates a person based off of the personWhereUniqueInput
    // if the person does not exist it will be null
    const person = await this.person(personWhereUniqueInput);

    // If the person is null then return an empty array
    if (!person) {
      return [];
    }

    // Finds all people that share the same org as the person
    // return this.prisma.person.findMany({
    //   where: {
    //     org: {
    //       id: person.orgId,
    //     },
    //   },
    // });

    return this.prisma.person.findMany({
      where: {
        org: {
          id: person.orgId,
        },
      },
    });
  }

  async persons(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PersonWhereUniqueInput;
    where?: Prisma.PersonWhereInput;
    orderBy?: Prisma.PersonOrderByWithRelationInput;
  }): Promise<Person[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.person.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.PersonCreateInput): Promise<Person> {
    return this.prisma.person.create({
      data,
    });
  }

  async findMany(): Promise<Person[]> {
    return this.prisma.person.findMany();
  }

  async findUnique(
    personWhereUniqueInput: Prisma.PersonWhereUniqueInput
  ): Promise<Person | null> {
    return this.prisma.person.findUnique({
      where: personWhereUniqueInput,
    });
  }

  async update(
    personWhereUniqueInput: Prisma.PersonWhereUniqueInput,
    personUpdateInput: Prisma.PersonUpdateInput
  ): Promise<Person> {
    return this.prisma.person.update({
      where: personWhereUniqueInput,
      data: personUpdateInput,
    });
  }

  async delete(personWhereUniqueInput: Prisma.PersonWhereUniqueInput) {
    return this.prisma.person.delete({
      where: personWhereUniqueInput,
    });
  }

  async createAdminAccount() {
    // do not do the below if we are in a production environment
    // this is just for development purposes
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    // create an admin account if one does not exist
    // look for a person with the unique id "admin_account"
    // if one does not exist then create one
    // if one does exist then do nothing
    const adminAccount = this.prisma.person.findUnique({
      where: {
        id: 'admin_account',
      },
    });

    // if the admin account does not exist then create one
    if (!adminAccount) {
      const account_details: Prisma.PersonCreateInput = {
        id: 'admin_account',
        firstName: 'admin',
        lastName: 'account',
        dodId: 0,
        ssn: 0,
        hairColor: 'BROWN',
        email: 'admin.account@us.af.mil',
        middleInitial: 'A',
        birthDate: new Date('01/01/2001'),
        birthCity: 'Washington',
        birthCountry: 'USA',
        citizenshipId: '1',
        grade: 1,
        eyeColor: 'BLUE',
        birthState: 'CA',
        role: 'ADMIN',
        spec: 'ENLISTED',
        height: 60,
        org: {
          connect: {
            id: undefined,
          },
        },
      };

      this.prisma.person.create({
        data: account_details,
      });
    }
  }
}
