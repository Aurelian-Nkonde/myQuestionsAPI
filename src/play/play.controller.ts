import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { PlayService } from './play.service';
import { CreatePlayDto } from './dto/create-play.dto';
import { PlayEntity } from './entities/play.entity';

@Controller('play')
export class PlayController {
  constructor(private readonly playService: PlayService) {}

  @Post()
  async createAPlay(@Body() createPlayDTO: CreatePlayDto): Promise<PlayEntity> {
    return await this.playService.createAPlay(createPlayDTO);
  }

  @Get()
  async getAllPlays(): Promise<PlayEntity[]> {
    return await this.playService.getAllPlays();
  }

  @Get('details/:id')
  async getAPlay(@Param('id') id: string): Promise<PlayEntity> {
    return await this.playService.getAPlay(id);
  }

  @Get('user/all/:id')
  async getAllUserPlays(@Param('id') id: string): Promise<PlayEntity[]> {
    return await this.playService.getUserPlays(id);
  }

  @Put('details/update/:id')
  async updatePlayScore(
    @Param('id') id: string,
    @Body('score') score: number,
  ): Promise<PlayEntity> {
    return await this.playService.updatePlayScore(id, score);
  }
}
