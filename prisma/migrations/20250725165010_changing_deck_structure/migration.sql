/*
  Warnings:

  - You are about to drop the column `answer` on the `Deck` table. All the data in the column will be lost.
  - You are about to drop the column `possibleAnswers` on the `Deck` table. All the data in the column will be lost.
  - You are about to drop the column `questionText` on the `Deck` table. All the data in the column will be lost.
  - Added the required column `questions` to the `Deck` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deck" DROP COLUMN "answer",
DROP COLUMN "possibleAnswers",
DROP COLUMN "questionText",
ADD COLUMN     "questions" JSONB NOT NULL;
