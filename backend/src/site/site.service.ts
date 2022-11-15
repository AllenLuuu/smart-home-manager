import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Site, SiteDocument } from './schemas/site.schema';

@Injectable()
export class SiteService {
  constructor(@InjectModel(Site.name) private siteModal: Model<SiteDocument>) {}

  async list(searchText: string, host: string): Promise<SiteDocument[]> {
    const sites = await this.siteModal.find({
      host,
      name: { $regex: searchText, $options: 'i' },
    });
    return sites;
  }
}
