import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from 'src/account/schemas/account.schema';
import { WrongRequestException } from 'src/wrong-request.exception';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const id = request.cookies.id;
    const user = await this.accountModel.findById(id);

    if (user) {
      return true;
    } else {
      throw new WrongRequestException(20001);
    }
  }
}
