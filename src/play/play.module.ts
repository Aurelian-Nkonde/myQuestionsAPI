import { Module } from '@nestjs/common';
import { PlayService } from './play.service';
import { PlayController } from './play.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { NotificationsService } from 'src/notifications/notifications.service';

@Module({
  imports: [NotificationsModule],
  controllers: [PlayController],
  providers: [PlayService, PrismaService, NotificationsService],
})
export class PlayModule {}
