import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RecipeDocument = HydratedDocument<RecipeBase>;

@InputType({ isAbstract: true })
@ObjectType({ isAbstract: true })
export class RecipeBase {
  @Field(() => ID)
  id: string;

  @Field()
  @MaxLength(30)
  @Prop({ required: true })
  @Prop()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  @Prop()
  description?: string;

  @Field()
  @Prop()
  createdAt: Date;

  @Field(() => [String])
  @Prop()
  ingredients: string[];

  @Prop()
  @Field(() => String)
  userId: Types.ObjectId;

  @Field()
  @Prop()
  updatedAt: Date;
}

@Schema({ timestamps: true })
export class Recipe extends RecipeBase {}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
