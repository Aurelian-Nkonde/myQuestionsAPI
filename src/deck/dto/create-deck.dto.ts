import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { Target } from 'generated/prisma';
import { Questions } from '../entities/deck.entity';

export class CreateDeckDto {
  @Length(12)
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  coverImage?: string;

  @IsNumber()
  numberOfQuestions: number;

  @IsEnum(Target)
  target: Target;

  @IsNotEmpty()
  questions: Questions[];
}
