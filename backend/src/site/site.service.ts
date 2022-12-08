import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WrongRequestException } from 'src/wrong-request.exception';
import { Site, SiteDocument } from './schemas/site.schema';

@Injectable()
export class SiteService {
  constructor(@InjectModel(Site.name) private siteModel: Model<SiteDocument>) {}

  async list(searchText: string, host: string): Promise<SiteDocument[]> {
    const sites = await this.siteModel.find({
      host,
      name: { $regex: searchText, $options: 'i' },
    });
    return sites;
  }

  async create(name: string, host: string): Promise<boolean> {
    const site = await this.siteModel.findOne({ name, host });
    if (site) {
      throw new WrongRequestException(30001);
    } else {
      await this.siteModel.create({ name, host, rooms: [] });
      return true;
    }
  }
}
