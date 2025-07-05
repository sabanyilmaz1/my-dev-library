-- First, add the column as nullable
ALTER TABLE "page" ADD COLUMN "template" TEXT;

-- Update existing rows with the default value
UPDATE "page" SET "template" = 'amour-1' WHERE "template" IS NULL;

-- Make the column required with a default value
ALTER TABLE "page" ALTER COLUMN "template" SET NOT NULL;
ALTER TABLE "page" ALTER COLUMN "template" SET DEFAULT 'amour-1'; 