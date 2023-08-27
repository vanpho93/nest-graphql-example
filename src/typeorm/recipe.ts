import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user';

@InputType({ isAbstract: true })
@ObjectType({ isAbstract: true })
@Entity()
export class Recipe {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.recipes)
  user: User;

  @Field()
  @MaxLength(30)
  @Column()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  @Column()
  description?: string;

  @Field(() => [String])
  @Column({ type: 'json' })
  ingredients: string[];

  @Field()
  @Column({ default: '2023-01-01' })
  createdAt: Date;

  @Field()
  @Column({ default: '2023-01-01' })
  updatedAt: Date;
}
