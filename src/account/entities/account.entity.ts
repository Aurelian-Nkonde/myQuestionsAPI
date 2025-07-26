import { Gender } from 'generated/prisma';

export class AccountEntity {
  uniqueId: string;
  username: string;
  email: string;
  active: boolean;
  gender: Gender;
  phoneNumber: string;
}
