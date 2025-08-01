import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayDto } from './dto/create-play.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlayEntity } from './entities/play.entity';
import ShortUniqueId from 'short-unique-id';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationType } from 'generated/prisma';

@Injectable()
export class PlayService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationsService,
  ) {}

  async createAPlay(play: CreatePlayDto): Promise<PlayEntity> {
    const uuid = new ShortUniqueId({ length: 12 });
    const newPlay = await this.prisma.play.create({
      data: {
        uniqueId: uuid.rnd(),
        score: 0,
        completed: false,
        ...play,
      },
    });
    if (!newPlay) {
      throw new InternalServerErrorException('Error creating a play');
    }
    const deck = await this.prisma.deck.findFirst({
      where: { uniqueId: newPlay.deckId },
    });
    // create a notification
    if (deck?.userId) {
      await this.notificationService.createANotification({
        userId: deck?.userId,
        notificationType: NotificationType.DECKPLAYED,
      });
    }
    return newPlay;
  }

  async getAllPlays(): Promise<PlayEntity[]> {
    return await this.prisma.play.findMany();
  }

  async getAPlay(id: string): Promise<PlayEntity> {
    const play = await this.prisma.play.findFirst({ where: { uniqueId: id } });
    if (!play) {
      throw new NotFoundException();
    }
    return play;
  }

  async getUserPlays(userId: string): Promise<PlayEntity[]> {
    return await this.prisma.play.findMany({ where: { playerId: userId } });
  }

  async updatePlayScore(playId: string, score: number): Promise<PlayEntity> {
    const play = await this.prisma.play.findFirst({
      where: { uniqueId: playId },
    });
    if (!play) {
      throw new NotFoundException();
    }
    const updatedPlay = await this.prisma.play.update({
      where: { uniqueId: play.uniqueId },
      data: { completed: true, score: score },
    });
    if (!updatedPlay) {
      throw new InternalServerErrorException();
    }
    return updatedPlay;
  }
}
