import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 3 })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Add any pre-save hooks or methods here
UserSchema.pre('save', function(next) {
  // We can add password hashing here later
  next();
});