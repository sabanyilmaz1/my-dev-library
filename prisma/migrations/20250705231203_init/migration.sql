/*
  Warnings:

  - You are about to drop the column `answer_for_lock` on the `page` table. All the data in the column will be lost.
  - You are about to drop the column `config` on the `page` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `page` table. All the data in the column will be lost.
  - You are about to drop the column `question_for_lock` on the `page` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `page` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `page` table. All the data in the column will be lost.
  - You are about to drop the column `template` on the `page` table. All the data in the column will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `page` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_customerId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_pageId_fkey";

-- DropIndex
DROP INDEX "page_slug_key";

-- AlterTable
ALTER TABLE "page" DROP COLUMN "answer_for_lock",
DROP COLUMN "config",
DROP COLUMN "name",
DROP COLUMN "question_for_lock",
DROP COLUMN "slug",
DROP COLUMN "status",
DROP COLUMN "template",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "tags" JSONB[],
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "tags" JSONB[];

-- DropTable
DROP TABLE "payments";

-- DropEnum
DROP TYPE "PageStatus";
