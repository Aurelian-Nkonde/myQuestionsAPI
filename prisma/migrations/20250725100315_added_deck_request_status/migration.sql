/*
  Warnings:

  - Added the required column `status` to the `Deck` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deck" ADD COLUMN     "status" BOOLEAN NOT NULL;
