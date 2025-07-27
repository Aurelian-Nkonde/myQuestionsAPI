import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { InvitationAndRequestsService } from './invitation-and-requests.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { InvitationEntity } from './entities/invitation.entity';
import { InviteStatus } from 'generated/prisma';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestEntity } from './entities/request.entity';

@Controller('invitation-and-requests')
export class InvitationAndRequestsController {
  constructor(
    private readonly invitationAndRequestsService: InvitationAndRequestsService,
  ) {}

  @Post()
  async createAInvitation(
    @Body() createInvitatinDto: CreateInvitationDto,
  ): Promise<InvitationEntity> {
    return await this.invitationAndRequestsService.createInvitation(
      createInvitatinDto,
    );
  }

  @Get('invites/:id/sent-out')
  async getAllSentOutInvites(
    @Param('id') id: string,
  ): Promise<InvitationEntity[]> {
    return await this.invitationAndRequestsService.getAllSentOutInvites(id);
  }

  @Put('cancel/:id')
  async cancelInvitation(@Param('id') id: string): Promise<InvitationEntity> {
    return await this.invitationAndRequestsService.cancelSentInvitation(id);
  }

  @Put('update/invite/:id')
  async updateInvite(
    @Param('id') id: string,
    status: InviteStatus,
  ): Promise<InvitationEntity> {
    return await this.invitationAndRequestsService.updateInvitation(id, status);
  }

  @Get('invitation/sent-to-me/:id')
  async getInvitationSentToMe(
    @Param('id') id: string,
  ): Promise<InvitationEntity[]> {
    return await this.invitationAndRequestsService.getAllInvitationsSentToMe(
      id,
    );
  }

  @Post('create/request')
  async createRequest(
    @Body() createRequestDto: CreateRequestDto,
  ): Promise<RequestEntity> {
    return await this.invitationAndRequestsService.createARequest(
      createRequestDto,
    );
  }

  @Put('request/cancel/:id')
  async cancelRequest(@Param('id') id: string): Promise<RequestEntity> {
    return await this.invitationAndRequestsService.cancelARequest(id);
  }

  @Get('request/all/:id/sent-out')
  async getRequestSentOut(@Param('id') id: string): Promise<RequestEntity[]> {
    return await this.invitationAndRequestsService.getAllRequestSentOut(id);
  }
}
