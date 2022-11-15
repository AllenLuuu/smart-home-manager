import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from 'src/account/account.module';
import { Site, SiteSchema } from './schemas/site.schema';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Site.name, schema: SiteSchema }]), AccountModule],
  controllers: [SiteController],
  providers: [SiteService],
})
export class SiteModule {
}
