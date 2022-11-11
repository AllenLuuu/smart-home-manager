import { Module, Global } from '@nestjs/common';
import { ReturnService } from './return.service';

@Global()
@Module({
  providers: [ReturnService],
  exports: [ReturnService]
})
export class ReturnModule {}
