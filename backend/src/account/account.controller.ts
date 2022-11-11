import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/account.dto';
import { AccountService } from './account.service';
import { ReturnDto } from 'src/return/return.dto';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<ReturnDto<null>> {
        return this.accountService.login(loginDto);
    }
}
