/* eslint-disable complexity */
import { PrismaClient } from '.prisma/corps/client';

//TODO refactor to not repeat code so much(DRY) - like the org/tag are done

const prisma = new PrismaClient();

async function main() {

  return;
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
