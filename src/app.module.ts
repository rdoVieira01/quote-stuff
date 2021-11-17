import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ProvidersModule } from './providers/providers.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QuotesModule } from './quotes/quotes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      debug: false,
      playground: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ProvidersModule,
    QuotesModule,
  ],
})
export class AppModule {}
