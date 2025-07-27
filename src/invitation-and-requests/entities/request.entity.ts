import { deckRequestStatus } from 'generated/prisma';

export class RequestEntity {
  uniqueId: string;
  deckId: string;
  userId: string;
  status: deckRequestStatus;
  createdAt: Date;
}
