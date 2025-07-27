import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationEntity } from './entities/notification.entity';
import ShortUniqueId from 'short-unique-id';
import { NotificationType } from 'generated/prisma';
// import { NotificationStatus } from 'generated/prisma';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async createANotification(
    createNotificationDTO: CreateNotificationDto,
  ): Promise<NotificationEntity> {
    const uuid = new ShortUniqueId({ length: 12 });
    const newNotification = await this.prisma.notification.create({
      data: {
        uniqueId: uuid.rnd(),
        status: 'UNREAD',
        NotificationMessage: this.getNotificationMessage(
          createNotificationDTO.notificationType,
        ),
        ...createNotificationDTO,
      },
    });
    if (!newNotification) {
      throw new InternalServerErrorException();
    }
    return newNotification;
  }

  getNotificationMessage(notificationType: NotificationType): string {
    switch (notificationType) {
      case NotificationType.DECKPLAYED:
        return 'Someone played your deck!';
      case NotificationType.DECKPLAYINVITE:
        return `{You're invited to play a deck.}`;
      case NotificationType.DECKPLAYREQUEST:
        return 'Someone is interested in playing your deck.';
      default:
        return '';
    }
  }

  async readNotification(id: string): Promise<NotificationEntity> {
    const notification = await this.prisma.notification.findFirst({
      where: { uniqueId: id },
    });
    if (!notification) {
      throw new NotFoundException();
    }
    const updatedNotification = await this.prisma.notification.update({
      where: { uniqueId: notification.uniqueId },
      data: { status: 'READ' },
    });
    if (!updatedNotification) {
      throw new InternalServerErrorException();
    }
    return updatedNotification;
  }

  async getUserUnreadNotifications(
    userId: string,
  ): Promise<NotificationEntity[]> {
    return await this.prisma.notification.findMany({
      where: { userId: userId, status: 'UNREAD' },
    });
  }

  async getUserNotifications(userId: string): Promise<NotificationEntity[]> {
    return await this.prisma.notification.findMany({
      where: { userId: userId },
    });
  }

  async getUserNotificationsCount(userId: string): Promise<number> {
    return await this.prisma.notification.count({
      where: { userId: userId },
    });
  }

  async getUserUnReadNotificationsCount(userId: string): Promise<number> {
    return await this.prisma.notification.count({
      where: { userId: userId, status: 'UNREAD' },
    });
  }
}
