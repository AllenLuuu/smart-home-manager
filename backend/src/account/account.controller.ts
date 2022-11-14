import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/account.dto';
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
      res.cookie('id', id, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
      res.send(this.returnService.wrapReturn(true, null));
    } else {
      res.send(this.returnService.wrapReturn(false, null, 10001));
    }
  }

  @Post('signUp')
  async signUp(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const returnDto = await this.accountService.signUp(registerDto);
    if (returnDto.errorCode === 0) {
      res.cookie('id', returnDto.data, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
    }
    res.send(returnDto);
  }
}
