import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from './schemas/account.schema';
import { LoginDto, RegisterDto } from './dto/account.dto';
import { ReturnService } from 'src/return/return.service';
import { ReturnDto } from 'src/return/return.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    private readonly returnService: ReturnService,
  ) {}

  async login(loginDto: LoginDto): Promise<string | null> {
    const account = await this.accountModel.findOne({ username: loginDto.username });
    if (account) {
      if (account.password === loginDto.password) {
        return account.id;
      }
    }
    return null;
  }

  async signUp(registerDto: RegisterDto): Promise<ReturnDto<any>> {
    const checkUsername = await this.accountModel.findOne({ username: registerDto.username });
    if (checkUsername) {
      return this.returnService.wrapReturn(false, null, 10002);
    }
    const checkPhone = await this.accountModel.findOne({ phone: registerDto.phone });
    if (checkPhone) {
      return this.returnService.wrapReturn(false, null, 10003);
    }

    const createdAccount = await this.accountModel.create(registerDto);
    return this.returnService.wrapReturn(true, createdAccount.id);
  }
}
