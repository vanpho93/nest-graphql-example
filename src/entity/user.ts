import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@InputType({ isAbstract: true })
@ObjectType({ isAbstract: true })
export class UserBase {
  @Field(() => ID)
  id: string;

  @Field()
  @MaxLength(30)
  @Prop({ required: true })
  @Prop()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  @Prop()
  name?: string;

  @Field()
  @Prop()
  createdAt: Date;

  @Field()
  @Prop()
  updatedAt: Date;
}

@Schema({ timestamps: true })
export class User extends UserBase {}

export const UserSchema = SchemaFactory.createForClass(User);
