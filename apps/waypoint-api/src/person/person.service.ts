import { Injectable } from '@nestjs/common';
import { Prisma, Person } from '.prisma/waypoint/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PersonService {
  constructor(private prisma: PrismaService) {}

  async findMany(params: {
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

  // TODO: Reimplement this once we have auth
  async findManyInOrg(
    personWhereUniqueInput: Prisma.PersonWhereUniqueInput
  ): Promise<Person[]> {
    // gets a person based off of the personWhereUniqueInput
    // if the person does not exist it will be null
    const person = await this.findUnique(personWhereUniqueInput);

    // If the person is null then return an empty array
    if (!person) {
      return [];
    }

    // Finds all people that share the same org as the person
    return this.findMany({
      where: {
        org: {
          id: person.orgId,
        },
      },
    });
  }

  async findUnique(
    personWhereUniqueInput: Prisma.PersonWhereUniqueInput
  ): Promise<Person | null> {
    return this.prisma.person.findUnique({
      where: personWhereUniqueInput,
    });
  }

  async create(data: Prisma.PersonCreateInput): Promise<Person> {
    return this.prisma.person.create({
      data,
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

  async delete(
    personWhereUniqueInput: Prisma.PersonWhereUniqueInput
  ): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.prisma.person.delete({
        where: personWhereUniqueInput,
      });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
