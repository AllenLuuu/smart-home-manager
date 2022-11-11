import { Injectable } from '@nestjs/common';
import { ReturnDto } from './return.dto';
import errorMsg from './errorMsg';

@Injectable()
export class ReturnService {
  constructor() {}

  wrapReturn<T>(success: boolean, data: T, errorCode?: number): ReturnDto<T> {
    return {
      errorCode: success ? 0 : errorCode,
      errorMessage: success ? '' : errorMsg[errorCode],
      data: data,
    };
  }
}
