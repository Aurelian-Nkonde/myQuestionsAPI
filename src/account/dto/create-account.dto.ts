import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';
import { Gender } from 'generated/prisma';

export class CreateAccountDto {
  @IsEmail()
  email: string;

  @Length(5, 20)
  @IsNotEmpty()
  password: string;

  @IsEnum(Gender)
  gender: Gender;

  @Length(5, 40)
  @IsNotEmpty()
  username: string;

  @Length(10, 12)
  @IsNotEmpty()
  phoneNumber: string;
}
