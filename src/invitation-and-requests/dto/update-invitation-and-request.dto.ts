import { PartialType } from '@nestjs/mapped-types';
import { CreateInvitationAndRequestDto } from './create-invitation.dto';

export class UpdateInvitationAndRequestDto extends PartialType(
  CreateInvitationAndRequestDto,
) {}
