/*
  Warnings:

  - Added the required column `subTotal` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "subTotal" DOUBLE PRECISION NOT NULL;
