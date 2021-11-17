import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersResolver } from './providers.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Provider, ProviderSchema } from './entities/provider.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Provider.name, schema: ProviderSchema },
    ]),
  ],
  providers: [ProvidersResolver, ProvidersService],
  exports: [ProvidersService],
})
export class ProvidersModule {}
