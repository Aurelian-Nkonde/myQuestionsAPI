import { Module } from '@nestjs/common';
import { PlayService } from './play.service';
import { PlayController } from './play.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PlayController],
  providers: [PlayService, PrismaService],
})
export class PlayModule {}
