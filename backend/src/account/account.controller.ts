import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './login.dto';

@Controller('account')
export class AccountController {
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<boolean> {
        if (loginDto.password === loginDto.username) {
            return true;
        } else {
            return false;
        }
    }
}
