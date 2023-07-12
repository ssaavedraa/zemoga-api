-- CreateEnum
CREATE TYPE "Vote" AS ENUM ('POSITIVE', 'NEGATIVE');

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Votes" (
    "id" SERIAL NOT NULL,
    "positive" INTEGER NOT NULL,
    "negative" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "Votes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_name_key" ON "Person"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Votes_personId_key" ON "Votes"("personId");

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
