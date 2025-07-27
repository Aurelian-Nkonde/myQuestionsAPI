import { InviteStatus } from 'generated/prisma';

export class InvitationEntity {
  uniqueId: string;
  deckId: string;
  status: InviteStatus;
  inviteeId: string;
  inviteeEmail: string;
  createdAt: Date;
}
