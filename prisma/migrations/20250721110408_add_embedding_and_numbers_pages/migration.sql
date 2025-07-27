/*
  Warnings:

  - Added the required column `embedding` to the `page` table without a default value. This is not possible if the table is not empty.

*/
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- AlterTable
ALTER TABLE "page" ADD COLUMN     "embedding" vector(768) NOT NULL DEFAULT array_fill(0,ARRAY[768])::vector;

-- AlterTable
ALTER TABLE "tag" ADD COLUMN     "numbers_pages" INTEGER NOT NULL DEFAULT 0;
