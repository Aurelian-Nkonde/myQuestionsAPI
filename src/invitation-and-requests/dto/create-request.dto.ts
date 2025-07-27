import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRequestDto {
  @IsNotEmpty()
  @IsString()
  deckId: string;
  @IsNotEmpty()
  @IsString()
  userId: string;
}
