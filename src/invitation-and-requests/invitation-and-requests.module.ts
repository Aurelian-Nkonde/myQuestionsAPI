import { Module } from '@nestjs/common';
import { InvitationAndRequestsService } from './invitation-and-requests.service';
import { InvitationAndRequestsController } from './invitation-and-requests.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [InvitationAndRequestsController],
  providers: [InvitationAndRequestsService, PrismaService],
})
export class InvitationAndRequestsModule {}
