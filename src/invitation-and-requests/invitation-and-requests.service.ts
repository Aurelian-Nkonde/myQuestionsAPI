import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateInvitationAndRequestDto,
  CreateInvitationDto,
} from './dto/create-invitation.dto';
import { UpdateInvitationAndRequestDto } from './dto/update-invitation-and-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { InvitationEntity } from './entities/invitation.entity';
import ShortUniqueId from 'short-unique-id';
import { InviteStatus } from 'generated/prisma';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestEntity } from './entities/request.entity';

@Injectable()
export class InvitationAndRequestsService {
  constructor(private prisma: PrismaService) {}

  async createInvitation(
    createInvitationDto: CreateInvitationDto,
  ): Promise<InvitationEntity> {
    const user = await this.prisma.user.findFirst({
      where: { email: createInvitationDto.inviteeEmail },
    });
    if (!user) {
      throw new NotFoundException();
    }
    const uuid = new ShortUniqueId({ length: 12 });
    const newInvitation = await this.prisma.invite.create({
      data: {
        uniqueId: uuid.rnd(),
        status: 'PENDING',
        ...createInvitationDto,
      },
    });
    if (!newInvitation) {
      throw new InternalServerErrorException('Error creating an invitation');
    }
    // create notification here
    // send email
    return newInvitation;
  }

  async getAllSentOutInvites(userId: string): Promise<InvitationEntity[]> {
    return await this.prisma.invite.findMany({ where: { inviteeId: userId } });
  }

  async cancelSentInvitation(id: string): Promise<InvitationEntity> {
    const invite = await this.prisma.invite.findFirst({
      where: { uniqueId: id },
    });
    if (!invite) {
      throw new NotFoundException('Invitation is not found!');
    }
    const updated = await this.prisma.invite.update({
      where: { uniqueId: invite.uniqueId },
      data: { status: 'CANCELLED' },
    });
    if (!updated) {
      throw new InternalServerErrorException(
        'Error  cancelling an invatation!',
      );
    }
    // send email and notification
    return updated;
  }

  async updateInvitation(
    id: string,
    status: InviteStatus,
  ): Promise<InvitationEntity> {
    const invite = await this.prisma.invite.findFirst({
      where: { uniqueId: id },
    });
    if (!invite) {
      throw new NotFoundException();
    }
    if (status == 'ACCEPTED' || status == 'REJECTED') {
      const updated = await this.prisma.invite.update({
        where: { uniqueId: id },
        data: { status: status == 'ACCEPTED' ? 'ACCEPTED' : 'REJECTED' },
      });
      if (!updated) {
        throw new InternalServerErrorException('error updating an invitation');
      }
      return updated;
    }
    return invite;
  }

  async getAllInvitationsSentToMe(userId: string): Promise<InvitationEntity[]> {
    const user = await this.prisma.user.findFirst({
      where: { uniqueId: userId },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return await this.prisma.invite.findMany({
      where: { inviteeEmail: user.email },
    });
  }

  async createARequest(
    createRequestDto: CreateRequestDto,
  ): Promise<RequestEntity> {
    const uuid = new ShortUniqueId({ length: 12 });
    const newRequest = await this.prisma.deckRequest.create({
      data: {
        uniqueId: uuid.rnd(),
        status: 'PENDING',
        ...createRequestDto,
      },
    });
    if (!newRequest) {
      throw new InternalServerErrorException();
    }
    return newRequest;
  }

  async cancelARequest(id: string): Promise<RequestEntity> {
    const request = await this.prisma.deckRequest.findFirst({
      where: { uniqueId: id },
    });
    if (!request) {
      throw new InternalServerErrorException();
    }
    const cancelled = await this.prisma.deckRequest.update({
      where: { uniqueId: request.uniqueId },
      data: { status: 'CANCELLED' },
    });
    if (!cancelled) {
      throw new InternalServerErrorException();
    }
    return cancelled;
  }

  async getAllRequestSentOut(id: string): Promise<RequestEntity[]> {
    return await this.prisma.deckRequest.findMany({ where: { userId: id } });
  }
}
