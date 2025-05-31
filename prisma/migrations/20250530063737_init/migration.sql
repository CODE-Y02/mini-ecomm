/*
  Warnings:

  - Made the column `price` on table `Variant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Variant" ALTER COLUMN "price" SET NOT NULL;
