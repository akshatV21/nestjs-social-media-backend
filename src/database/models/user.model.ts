import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { hashSync } from 'bcrypt'
import { Document, Types } from 'mongoose'

export type UserDocument = User & Document

@Schema({ _id: false })
export class UserRequests {
  @Prop({ default: [], ref: 'Request' })
  sent: Types.ObjectId[]

  @Prop({ default: [], ref: 'Request' })
  received: Types.ObjectId[]
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string

  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ default: [], ref: 'User' })
  followers: Types.ObjectId[]

  @Prop({ default: [], ref: 'User' })
  following: Types.ObjectId[]

  @Prop({ default: new UserRequests() })
  requests: UserRequests
}

const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  this.password = hashSync(this.password, 10)
  next()
})

export { UserSchema }
