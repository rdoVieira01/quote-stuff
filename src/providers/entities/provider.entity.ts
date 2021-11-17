// import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

export type ProviderDocument = Provider & Document;

@ObjectType()
// @InputType('ProviderInput')
@Schema({ collection: 'providers' })
export class Provider {
  @Field(() => ID)
  @Prop({ type: mongooseSchema.Types.ObjectId })
  _id: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  url: string;

  @Field({ nullable: true })
  @Prop()
  description: string;

  @Field({ nullable: true })
  @Prop()
  quoteField: string;

  @Field({ nullable: true })
  @Prop()
  authorField: string;

  @Field({ nullable: true })
  @Prop()
  defaultAuthor: string;

  @Field({ nullable: true })
  @Prop()
  array: boolean;
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
