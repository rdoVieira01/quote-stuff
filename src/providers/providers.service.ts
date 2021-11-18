import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Provider, ProviderDocument } from './entities/provider.entity';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectModel(Provider.name)
    private readonly providerModel: Model<ProviderDocument>,
  ) {}

  findAll() {
    return this.providerModel.find({});
  }

  findOne(id?: string, name?: string) {
    return this.providerModel.findOne({
      $or: [{ _id: id }, { name }],
    });
  }

  getRandom() {
    return this.providerModel.aggregate([{ $sample: { size: 1 } }]);
  }

}
