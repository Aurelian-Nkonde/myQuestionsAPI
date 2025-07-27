import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateInvitationDto {
  @IsString()
  @IsNotEmpty()
  deckId: string;
  @IsNotEmpty()
  @IsEmail()
  inviteeEmail: string;
  @IsNotEmpty()
  @IsString()
  inviteeId: string;
}
