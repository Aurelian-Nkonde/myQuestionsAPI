import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { DeckService } from './deck.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { deckCountType, DeckEntity } from './entities/deck.entity';
import { Target } from 'generated/prisma';

@Controller('deck')
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @Post()
  async createDeck(@Body() createDeckDto: CreateDeckDto): Promise<DeckEntity> {
    return await this.deckService.createDeck(createDeckDto);
  }

  @Get(':id')
  async getADeck(@Param('id') id: string): Promise<DeckEntity> {
    return await this.deckService.getDeck(id);
  }

  @Get('user/:id')
  async getUserDecks(@Param('id') id: string): Promise<DeckEntity[]> {
    return await this.deckService.getUserDecks(id);
  }

  @Get()
  async getAllDecks(): Promise<DeckEntity[]> {
    console.log('all decks!');
    return await this.deckService.getAllDecks();
  }

  @Put('change/target/:id')
  async changeDeckTarget(
    @Param('id') id: string,
    @Body('target') target: Target,
  ): Promise<DeckEntity> {
    return await this.deckService.changeDeckTarget(id, target);
  }

  @Get('all/active')
  async getActiveDecks(): Promise<DeckEntity[]> {
    return await this.deckService.getActiveDecks();
  }

  @Get('all/unactive')
  async getUnActiveDecks(): Promise<DeckEntity[]> {
    return await this.deckService.getUnActiveDecks();
  }

  @Put('status/:id')
  async changeDeckStatus(@Param('id') id: string): Promise<DeckEntity> {
    return await this.deckService.changeDeckStatus(id);
  }

  @Get('count/total')
  async getDecksCount(
    @Body('type') type: deckCountType,
    @Body('userId') userId?: string,
  ): Promise<number> {
    console.log({ type, userId });
    return await this.deckService.getDecksCount(type, userId);
  }
}
