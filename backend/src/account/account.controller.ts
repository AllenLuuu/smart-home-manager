import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginDto } from './dto/account.dto';
import { AccountService } from './account.service';
import { ReturnService } from 'src/return/return.service';
import { Response } from 'express';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly returnService: ReturnService,
  ) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const id = await this.accountService.login(loginDto);
    if (id) {
      res.cookie('id', id, { httpOnly: true });
      res.send(this.returnService.wrapReturn(true, null));
    } else {
      res.send(this.returnService.wrapReturn(false, null, 10001));
    }
  }
}
