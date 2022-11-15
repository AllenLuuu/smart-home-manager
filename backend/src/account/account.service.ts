import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from './schemas/account.schema';
import { LoginDto, RegisterDto } from './dto/account.dto';
import { ReturnService } from 'src/return/return.service';
import { WrongRequestException } from 'src/wrong-request.exception';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    private readonly returnService: ReturnService,
  ) {}

  async login(loginDto: LoginDto): Promise<string> {
    const account = await this.accountModel.findOne({ username: loginDto.username });
    if (account) {
      if (account.password === loginDto.password) {
        return account.id;
      }
    }
    throw new WrongRequestException(10001);
  }

  async signUp(registerDto: RegisterDto): Promise<string> {
    const checkUsername = await this.accountModel.findOne({ username: registerDto.username });
    if (checkUsername) {
      throw new WrongRequestException(10002);
    }
    const checkPhone = await this.accountModel.findOne({ phone: registerDto.phone });
    if (checkPhone) {
      throw new WrongRequestException(10003);
    }

    const createdAccount = await this.accountModel.create(registerDto);
    return createdAccount.id;
  }
}
