import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationEntity } from './entities/notification.entity';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async createNotification(@Body() body: any): Promise<NotificationEntity> {
    return await this.notificationsService.createANotification(body);
  }

  @Get('read/:id')
  async readNotification(@Param('id') id: string): Promise<NotificationEntity> {
    return await this.notificationsService.readNotification(id);
  }

  @Get('user/unread/:id')
  async getUserUnreadNotifications(
    @Param('id') id: string,
  ): Promise<NotificationEntity[]> {
    return await this.notificationsService.getUserUnreadNotifications(id);
  }

  @Get('user/:id/all')
  async getUserAllNotifications(
    @Param('id') id: string,
  ): Promise<NotificationEntity[]> {
    return await this.notificationsService.getUserNotifications(id);
  }

  @Get('unread/count/:id')
  async getUserAllNotificationsCount(@Param('id') id: string): Promise<number> {
    return await this.notificationsService.getUserUnReadNotificationsCount(id);
  }
}
