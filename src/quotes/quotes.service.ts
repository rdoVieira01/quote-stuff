import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProvidersService } from '../providers/providers.service';
import { CreateQuoteInput } from './dto/create-quote.input';
import { Quote, QuoteDocument } from './entities/quote.entity';
import { HttpService } from '@nestjs/axios';
import * as _ from 'lodash';

@Injectable()
export class QuotesService {
  constructor(
    @InjectModel(Quote.name)
    private readonly quotesModel: Model<QuoteDocument>,
    private readonly providerService: ProvidersService,
    private readonly httpService: HttpService,
  ) {}

  async create(createQuoteInput: CreateQuoteInput) {
    if (!createQuoteInput.providerId) createQuoteInput.providerId = 'Custom';
    createQuoteInput.createdAt = new Date();
    const createQuote = new this.quotesModel(createQuoteInput);
    const savedQuote = await createQuote.save();
    createQuoteInput._id = savedQuote._id;
    return savedQuote;
  }

  findAll() {
    return this.quotesModel.find({});
  }

  findAllByProvider(providerId: string) {
    return this.quotesModel.find({ providerId });
  }

  findAllByAuthor(author: string) {
    return this.quotesModel.find({ author });
  }

  findById(id: string) {
    return this.quotesModel.findById(id);
  }

  findByQuote(quote: string) {
    return this.quotesModel.findOne({ quote });
  }

  async getProviderQuote(providerId: string) {
    const provider = await this.providerService.findOne(providerId);
    const res = await this.httpService.get(provider.url).toPromise();

    let quoteRes = res.data;
    if (provider.array) {
      [quoteRes] = quoteRes;
    }

    const author = provider.defaultAuthor || _.get(quoteRes, provider.authorField);
    const quote = _.get(quoteRes, provider.quoteField);

    const exactQuote = await this.findByQuote(quote);
    if (exactQuote) return exactQuote;

    const fixedQuote: Quote = {
      author,
      quote,
      providerId: provider._id,
    };
    await this.create(fixedQuote);
    return fixedQuote;
  }

  async getRandomQuote() {
    const [provider] = await this.providerService.getRandom();
    const quote = await this.getProviderQuote(provider._id);
    return quote;
  }
}
