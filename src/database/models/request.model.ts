import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type RequestDocument = Request & Document

@Schema({ timestamps: true })
export class Request {
  @Prop({ required: true })
  from: Types.ObjectId

  @Prop({ required: true })
  to: Types.ObjectId
}

export const RequestSchema = SchemaFactory.createForClass(Request)
