-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SM', 'NONE');

-- CreateEnum
CREATE TYPE "HairColor" AS ENUM ('BLACK', 'BLONDE', 'BROWN', 'GRAY', 'RED', 'WHITE', 'BALD');

-- CreateEnum
CREATE TYPE "Spec" AS ENUM ('ENLISTED', 'OFFICER', 'CIVILIAN', 'CONTRACTOR', 'WARRANT', 'OTHER');

-- CreateEnum
CREATE TYPE "EyeColor" AS ENUM ('BLUE', 'GREEN', 'BROWN', 'BLACK', 'HAZEL');

-- CreateEnum
CREATE TYPE "OrgTier" AS ENUM ('WING', 'GROUP', 'SQUADRON', 'OTHER');

-- CreateEnum
CREATE TYPE "BirthState" AS ENUM ('OTHER', 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY');

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "dodId" DOUBLE PRECISION NOT NULL,
    "ssn" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleInitial" CHAR(1),
    "lastName" TEXT NOT NULL,
    "hairColor" "HairColor" NOT NULL,
    "eyeColor" "EyeColor" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "birthCity" TEXT NOT NULL,
    "birthState" "BirthState" NOT NULL,
    "birthCountry" TEXT NOT NULL,
    "citizenshipId" TEXT NOT NULL,
    "initialTraining" BOOLEAN NOT NULL DEFAULT false,
    "NDA" BOOLEAN NOT NULL DEFAULT false,
    "spec" "Spec" NOT NULL DEFAULT E'OTHER',
    "grade" INTEGER NOT NULL,
    "orgId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'NONE',
    "height" INTEGER NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Org" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "aliases" TEXT[],
    "orgTier" "OrgTier" NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "Org_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incident" (
    "id" TEXT NOT NULL,
    "openDate" TIMESTAMP(3) NOT NULL,
    "closeDate" TIMESTAMP(3) NOT NULL,
    "reportedDate" TIMESTAMP(3) NOT NULL,
    "selfReported" BOOLEAN NOT NULL,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_dodId_key" ON "Person"("dodId");

-- CreateIndex
CREATE UNIQUE INDEX "Person_ssn_key" ON "Person"("ssn");

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Org_name_key" ON "Org"("name");

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Org" ADD CONSTRAINT "Org_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Org"("id") ON DELETE SET NULL ON UPDATE CASCADE;
