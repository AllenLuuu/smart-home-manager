import { HttpException } from '@nestjs/common/exceptions';

export class WrongRequestException extends HttpException {
  private code: number;

  constructor(code: number, message: string) {
    super(message, 400);

    this.code = code;
  }

  public getCode(): number {
    return this.code;
  }
}
