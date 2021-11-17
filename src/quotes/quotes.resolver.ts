import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuotesService } from './quotes.service';
import { Quote } from './entities/quote.entity';
import { CreateQuoteInput } from './dto/create-quote.input';

@Resolver(() => Quote)
export class QuotesResolver {
  constructor(private readonly quotesService: QuotesService) {}

  @Mutation(() => Quote)
  createQuote(@Args('createQuoteInput') createQuoteInput: CreateQuoteInput) {
    return this.quotesService.create(createQuoteInput);
  }

  @Query(() => [Quote], { name: 'quotes' })
  findAll() {
    return this.quotesService.findAll();
  }

  @Query(() => [Quote], { name: 'quotesByProvider' })
  findAllByProvider(@Args('providerId') providerId: string) {
    return this.quotesService.findAllByProvider(providerId);
  }

  @Query(() => [Quote], { name: 'quotesByAuthor' })
  findAllByAuthor(@Args('author') author: string) {
    return this.quotesService.findAllByAuthor(author);
  }

  @Query(() => Quote, { name: 'quote' })
  findById(@Args('id') id: string) {
    return this.quotesService.findById(id);
  }

  @Query(() => Quote, { name: 'randomQuote' })
  randomQuote() {
    return this.quotesService.getRandomQuote();
  }

  @Query(() => Quote, { name: 'randomQuoteByProviderId' })
  randomQuoteByProviderId(@Args('providerId') providerId: string) {
    return this.quotesService.getProviderQuote(providerId);
  }
}
