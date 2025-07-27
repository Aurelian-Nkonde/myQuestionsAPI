import { Test, TestingModule } from '@nestjs/testing';
import { InvitationAndRequestsController } from './invitation-and-requests.controller';
import { InvitationAndRequestsService } from './invitation-and-requests.service';

describe('InvitationAndRequestsController', () => {
  let controller: InvitationAndRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvitationAndRequestsController],
      providers: [InvitationAndRequestsService],
    }).compile();

    controller = module.get<InvitationAndRequestsController>(
      InvitationAndRequestsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
