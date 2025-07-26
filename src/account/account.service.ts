import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import ShortUniqueId from 'short-unique-id';
import * as bcrypt from 'bcrypt';
import { AccountEntity } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async createUser(createAccountDto: CreateAccountDto): Promise<AccountEntity> {
    const userExist = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: createAccountDto.email },
          { phoneNumber: createAccountDto.phoneNumber },
        ],
      },
    });
    if (userExist) {
      throw new ConflictException('User already exist');
    }
    const uuid = new ShortUniqueId({ length: 12 });
    const hashedPassword = await bcrypt.hash(createAccountDto.password, 10);
    const createdUser = await this.prisma.user.create({
      data: {
        uniqueId: uuid.rnd(),
        password: hashedPassword,
        email: createAccountDto.email,
        username: createAccountDto.username,
        active: true,
        gender: createAccountDto.gender,
        phoneNumber: createAccountDto.phoneNumber,
      },
    });
    return createdUser;
  }

  async LoginUser() {}

  async getAUser(id: string): Promise<AccountEntity> {
    const user = await this.prisma.user.findFirst({
      where: {
        uniqueId: id,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async getAllUsers(): Promise<AccountEntity[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async getAllActiveUsers(): Promise<AccountEntity[]> {
    const users = await this.prisma.user.findMany({ where: { active: true } });
    return users;
  }

  async getAllUnActiveUsers(): Promise<AccountEntity[]> {
    const users = await this.prisma.user.findMany({ where: { active: false } });
    return users;
  }

  async makeUserActive(id: string): Promise<AccountEntity> {
    const user = await this.prisma.user.findFirst({ where: { uniqueId: id } });
    if (!user) {
      throw new NotFoundException();
    }
    const changedStatusUser = await this.prisma.user.update({
      where: {
        uniqueId: id,
      },
      data: {
        active: true,
      },
    });
    return changedStatusUser;
  }

  async activateUser(id: string): Promise<AccountEntity> {
    const user = await this.getAUser(id);
    const updatedUser = await this.prisma.user.update({
      where: {
        uniqueId: user.uniqueId,
      },
      data: { active: true },
    });
    if (!updatedUser) {
      throw new BadRequestException('Error activating a user');
    }
    console.log('done updating');
    return updatedUser;
  }

  async unActivateUser(id: string): Promise<AccountEntity> {
    const user = await this.getAUser(id);
    const updatedUser = await this.prisma.user.update({
      where: {
        uniqueId: user.uniqueId,
      },
      data: { active: false },
    });
    if (!updatedUser) {
      throw new BadRequestException('Error unActivating a user');
    }
    return updatedUser;
  }
}
