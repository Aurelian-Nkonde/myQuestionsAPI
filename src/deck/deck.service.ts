import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDeckDto } from './dto/create-deck.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { deckCountType, DeckEntity } from './entities/deck.entity';
import ShortUniqueId from 'short-unique-id';
import { Target } from 'generated/prisma';

@Injectable()
export class DeckService {
  constructor(private prisma: PrismaService) {}

  async createDeck(createDeckDto: CreateDeckDto): Promise<DeckEntity> {
    const uuid = new ShortUniqueId({ length: 12 });
    const newDeck = await this.prisma.deck.create({
      data: {
        uniqueId: uuid.rnd(),
        status: true,
        coverImage: createDeckDto.coverImage ?? '',
        userId: createDeckDto.userId,
        numberOfQuestions: createDeckDto.numberOfQuestions,
        target: createDeckDto.target,
        questions: [...createDeckDto.questions],
      },
    });
    if (!newDeck) {
      throw new BadRequestException('Error creating a new deck!');
    }
    console.log(newDeck);
    return newDeck as DeckEntity;
  }

  async getDeck(id: string): Promise<DeckEntity> {
    const deck = await this.prisma.deck.findFirst({ where: { uniqueId: id } });
    if (!deck) {
      throw new NotFoundException();
    }
    return deck as DeckEntity;
  }

  async getAllDecks(): Promise<DeckEntity[]> {
    console.log('hit!');
    return (await this.prisma.deck.findMany()) as DeckEntity[];
  }

  async getUserDecks(userId: string): Promise<DeckEntity[]> {
    const user = await this.prisma.user.findFirst({
      where: { uniqueId: userId },
    });
    if (!user) {
      throw new NotFoundException();
    }
    const decks = await this.prisma.deck.findMany({
      where: { userId: userId },
    });
    return decks as DeckEntity[];
  }

  async changeDeckTarget(deckId: string, target: Target): Promise<DeckEntity> {
    const deck = await this.getDeck(deckId);
    const updated = await this.prisma.deck.update({
      where: { uniqueId: deck.uniqueId },
      data: { target: target },
    });
    if (!updated) {
      throw new InternalServerErrorException('Error updating a deck target!');
    }
    return updated as DeckEntity;
  }

  async getActiveDecks(): Promise<DeckEntity[]> {
    return (await this.prisma.deck.findMany({
      where: { status: true },
    })) as DeckEntity[];
  }

  async getUnActiveDecks(): Promise<DeckEntity[]> {
    return (await this.prisma.deck.findMany({
      where: { status: false },
    })) as DeckEntity[];
  }

  async changeDeckStatus(deckId: string): Promise<DeckEntity> {
    const deck = await this.getDeck(deckId);
    const updatedDeck = await this.prisma.deck.update({
      where: { uniqueId: deck.uniqueId },
      data: { status: !deck.status },
    });
    if (!updatedDeck) {
      throw new InternalServerErrorException('Error changing deck status!');
    }
    return updatedDeck as DeckEntity;
  }

  async getDecksCount(type: deckCountType, userId?: string): Promise<number> {
    if (
      type == deckCountType.USER_ACTIVE_DECKS ||
      type == deckCountType.USER_ALL_DECKS ||
      type == deckCountType.USER_UNACTIVE_DECKS
    ) {
      if (!userId) {
        throw new BadRequestException('UserId is needed for this');
      }
      const user = await this.prisma.user.findFirst({
        where: { uniqueId: userId },
      });
      if (!user) {
        throw new BadRequestException();
      }
      if (type == deckCountType.USER_ACTIVE_DECKS) {
        return await this.prisma.deck.count({
          where: { userId: userId, status: true },
        });
      }
      if (type == deckCountType.USER_ALL_DECKS) {
        return await this.prisma.deck.count({ where: { userId: userId } });
      }
      if (type == deckCountType.USER_UNACTIVE_DECKS) {
        return await this.prisma.deck.count({
          where: { userId: userId, status: false },
        });
      }
      throw new BadRequestException();
    } else {
      switch (type) {
        case deckCountType.ALL_DECKS:
          return await this.prisma.deck.count();
        case deckCountType.ALL_DECKS_ACTIVE:
          return await this.prisma.deck.count({ where: { status: true } });
        case deckCountType.ALL_DECKS_UNACTIVE:
          return await this.prisma.deck.count({ where: { status: false } });
        default:
          throw new BadRequestException();
      }
    }
  }
}
