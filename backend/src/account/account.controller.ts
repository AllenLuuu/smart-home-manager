import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/account.dto';
import { AccountService } from './account.service';
import { ReturnService } from 'src/return/return.service';
import { Response } from 'express';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
  ) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean> {
    const id = await this.accountService.login(loginDto);
    res.cookie('id', id, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
    return true;
  }

  @Post('signUp')
  async signUp(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<true> {
    const id = await this.accountService.signUp(registerDto);
    res.cookie('id', id, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
    return true;
  }
}
