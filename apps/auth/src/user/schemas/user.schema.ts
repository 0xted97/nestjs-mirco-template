import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users' })
export class User {
  @ApiProperty()
  @Prop({ trim: true, lowercase: true })
  email: string;

  @ApiProperty()
  @Prop({ trim: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
