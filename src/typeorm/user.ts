import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Recipe } from './recipe';

@InputType({ isAbstract: true })
@ObjectType({ isAbstract: true })
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @MaxLength(30)
  @Column({ unique: true })
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  @Column({ nullable: true })
  name?: string;

  @Field()
  @Column({ default: '2023-01-01' })
  createdAt: Date;

  @Field()
  @Column({ default: '2023-01-01' })
  updatedAt: Date;

  @OneToMany(() => Recipe, (recipe) => recipe.user)
  recipes: Recipe[];
}
