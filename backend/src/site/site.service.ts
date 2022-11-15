import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WrongRequestException } from 'src/wrong-request.exception';
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

  async create(name: string, host: string): Promise<boolean> {
    const site = await this.siteModal.findOne({ name, host });
    if (site) {
      throw new WrongRequestException(30001);
    } else {
      await this.siteModal.create({ name, host, rooms: [] });
      return true;
    }
  }
}
