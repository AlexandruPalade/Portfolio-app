import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PortfolioEntryDocument = PortfolioEntry & Document;

@Schema()
export class PortfolioEntry {
  _id: string;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true, unique: true })
  description: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ default: false })
  isHidden: boolean;

  @Prop()
  customerWebsite: string;
}
export const PortfolioEntrySchema =
  SchemaFactory.createForClass(PortfolioEntry);
