import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Cookies } from 'src/cookie.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { AccountListDto } from './dto/site.dto';
import { SiteDocument } from './schemas/site.schema';
import { SiteService } from './site.service';

@Controller('site')
@UseGuards(AuthGuard)
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Post('list')
  async list(
    @Cookies('id') id: string,
    @Body() accountListDto: AccountListDto,
  ): Promise<SiteDocument[]> {
    return this.siteService.list(accountListDto.searchText, id);
  }
}
