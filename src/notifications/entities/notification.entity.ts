import { NotificationStatus, NotificationType } from 'generated/prisma';

export class NotificationEntity {
  uniqueId: string;
  userId: string;
  status: NotificationStatus;
  NotificationMessage: string;
  notificationType: NotificationType;
  createdAt: Date;
}

// export enum NotificationStatus {
//   READ = 'READ',
//   UNREAD = 'UNREAD',
// }

// export enum NotificationType {
//   DECKPLAYED = 'DECKPLAYED',
//   DECKPLAYREQUEST = 'DECKPLAYREQUEST',
//   DECKPLAYINVITE = 'DECKPLAYINVITE',
// }
