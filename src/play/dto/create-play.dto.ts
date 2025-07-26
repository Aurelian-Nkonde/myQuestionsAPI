import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlayDto {
  @IsString()
  @IsNotEmpty()
  playerId: string;
  @IsNotEmpty()
  @IsString()
  deckId: string;
  @IsNotEmpty()
  numberOfQuestions: number;
}
