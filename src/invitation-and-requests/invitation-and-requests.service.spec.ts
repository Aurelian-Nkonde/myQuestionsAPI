import { Test, TestingModule } from '@nestjs/testing';
import { InvitationAndRequestsService } from './invitation-and-requests.service';

describe('InvitationAndRequestsService', () => {
  let service: InvitationAndRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvitationAndRequestsService],
    }).compile();

    service = module.get<InvitationAndRequestsService>(
      InvitationAndRequestsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
