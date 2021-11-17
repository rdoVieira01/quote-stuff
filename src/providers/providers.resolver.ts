import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProvidersService } from './providers.service';
import { Provider } from './entities/provider.entity';
import { CreateProviderInput } from './dto/create-provider.input';
import { UpdateProviderInput } from './dto/update-provider.input';

@Resolver(() => Provider)
export class ProvidersResolver {
  constructor(private readonly providersService: ProvidersService) {}

  // @Mutation(() => Provider)
  // createProvider(@Args('createProviderInput') createProviderInput: CreateProviderInput) {
  //   return this.providersService.create(createProviderInput);
  // }

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

  // @Mutation(() => Provider)
  // updateProvider(@Args('updateProviderInput') updateProviderInput: UpdateProviderInput) {
  //   return this.providersService.update(updateProviderInput.id, updateProviderInput);
  // }

  // @Mutation(() => Provider)
  // removeProvider(@Args('id', { type: () => Int }) id: number) {
  //   return this.providersService.remove(id);
  // }
}
