import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountEntity } from './entities/account.entity';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('signup')
  async createUser(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<AccountEntity> {
    return await this.accountService.createUser(createAccountDto);
  }

  @Post('login')
  login(): string {
    return `login`;
  }

  @Get('all')
  async getAllAccounts(): Promise<AccountEntity[]> {
    return await this.accountService.getAllUsers();
  }

  @Get('all/active')
  async getAllActiveAccounts(): Promise<AccountEntity[]> {
    return await this.accountService.getAllActiveUsers();
  }

  @Get('all/unactive')
  async getAllUnAccounts(): Promise<AccountEntity[]> {
    return await this.accountService.getAllUnActiveUsers();
  }

  @Get(':id')
  async getAccount(
    @Param('id')
    id: string,
  ): Promise<AccountEntity> {
    console.log(id);
    return await this.accountService.getAUser(id);
  }

  @Put('user/:id/activate')
  async activateUser(@Param('id') id: string): Promise<AccountEntity> {
    return await this.accountService.activateUser(id);
  }

  @Put('user/:id/unactivate')
  async unactivateUser(@Param('id') id: string): Promise<AccountEntity> {
    return await this.accountService.unActivateUser(id);
  }
}
