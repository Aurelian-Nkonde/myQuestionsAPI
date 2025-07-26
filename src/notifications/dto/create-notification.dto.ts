import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { NotificationType } from 'generated/prisma';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  @IsEnum(NotificationType)
  notificationType: NotificationType;
}
