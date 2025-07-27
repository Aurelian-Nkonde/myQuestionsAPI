import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { PrismaService } from './prisma/prisma.service';
import { DeckModule } from './deck/deck.module';
import { PlayModule } from './play/play.module';
import { NotificationsModule } from './notifications/notifications.module';
import { InvitationAndRequestsModule } from './invitation-and-requests/invitation-and-requests.module';

@Module({
  imports: [
    AccountModule,
    DeckModule,
    PlayModule,
    NotificationsModule,
    InvitationAndRequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
