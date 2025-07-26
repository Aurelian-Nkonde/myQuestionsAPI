-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Target" AS ENUM ('Private', 'Public');

-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('Pending', 'Opened');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('READ', 'UNREAD');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('DECKPLAYED', 'DECKPLAYREQUEST', 'DECKPLAYINVITE');

-- CreateTable
CREATE TABLE "User" (
    "uniqueId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "gender" "Gender" NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uniqueId")
);

-- CreateTable
CREATE TABLE "Deck" (
    "uniqueId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "numberOfQuestions" INTEGER NOT NULL,
    "target" "Target" NOT NULL,
    "questionText" TEXT NOT NULL,
    "possibleAnswers" TEXT[],
    "answer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("uniqueId")
);

-- CreateTable
CREATE TABLE "Play" (
    "uniqueId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Play_pkey" PRIMARY KEY ("uniqueId")
);

-- CreateTable
CREATE TABLE "Invite" (
    "uniqueId" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    "status" "InviteStatus" NOT NULL DEFAULT 'Pending',
    "inviteeId" TEXT NOT NULL,
    "inviteeEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("uniqueId")
);

-- CreateTable
CREATE TABLE "Notification" (
    "uniqueId" TEXT NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'UNREAD',
    "userId" TEXT NOT NULL,
    "NotificationMessage" TEXT NOT NULL,
    "notificationType" "NotificationType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("uniqueId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Play_uniqueId_key" ON "Play"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "Invite_uniqueId_key" ON "Invite"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_uniqueId_key" ON "Notification"("uniqueId");
