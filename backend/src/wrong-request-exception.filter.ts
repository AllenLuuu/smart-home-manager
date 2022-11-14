import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { WrongRequestException } from './wrong-request.exception';

@Catch(WrongRequestException)
export class WrongRequestExceptionFilter implements ExceptionFilter {
  catch(exception: WrongRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.getResponse();
    const code = exception.getCode();

    response
      .send({
        errorCode: code,
        errorMessage: message,
        data: null,
      })
  }
}
