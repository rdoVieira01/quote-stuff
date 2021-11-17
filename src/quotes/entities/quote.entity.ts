// import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuoteDocument = Quote & Document;

@ObjectType()
@Schema({ collection: 'quotes', versionKey: false })
export class Quote {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Field({ nullable: true })
  @Prop()
  quote: string;

  @Field({ nullable: true })
  @Prop()
  author: string;

  @Field({ nullable: true })
  @Prop()
  providerId: string;

  @Field({ nullable: true })
  @Prop()
  createdAt?: Date;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
