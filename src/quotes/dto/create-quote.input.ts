import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@InputType()
export class CreateQuoteInput {
  _id?: string;

  @Field({ nullable: true })
  @Prop()
  quote: string;

  @Field({ nullable: true })
  @Prop()
  author: string;

  @Prop()
  providerId: string;

  @Prop()
  createdAt?: Date;
}
