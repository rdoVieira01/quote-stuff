import { Resolver, Query, Args } from '@nestjs/graphql';
import { ProvidersService } from './providers.service';
import { Provider } from './entities/provider.entity';

@Resolver(() => Provider)
export class ProvidersResolver {
  constructor(private readonly providersService: ProvidersService) {}

  @Query(() => [Provider], { name: 'providers' })
  findAll() {
    return this.providersService.findAll();
  }

  @Query(() => Provider, { name: 'provider', nullable: true })
  findOne(
    @Args('id', { type: () => String, nullable: true }) id: string,
    @Args('name', { type: () => String, nullable: true }) name: string,
  ) {
    return this.providersService.findOne(id, name);
  }
}
