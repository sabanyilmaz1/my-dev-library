/*
  Warnings:

  - Made the column `embedding` on table `page` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "page" ALTER COLUMN "embedding" SET NOT NULL;
