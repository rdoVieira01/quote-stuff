import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesResolver } from './quotes.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Quote, QuoteSchema } from './entities/quote.entity';
import { ProvidersModule } from '../providers/providers.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quote.name, schema: QuoteSchema }]),
    HttpModule,
    ProvidersModule,
  ],
  providers: [QuotesResolver, QuotesService],
})
export class QuotesModule {}
