/*
  Warnings:

  - Added the required column `numberOfQuestions` to the `Play` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Play" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "numberOfQuestions" INTEGER NOT NULL;
