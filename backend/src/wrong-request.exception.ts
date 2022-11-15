import { HttpException } from '@nestjs/common/exceptions';
import errorMsg from './errorMsg';

export class WrongRequestException extends HttpException {
  private code: number;

  constructor(code: number) {
    super(errorMsg[code], 400);

    this.code = code;
  }

  public getCode(): number {
    return this.code;
  }
}
