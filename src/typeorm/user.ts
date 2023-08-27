import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@InputType({ isAbstract: true })
@ObjectType({ isAbstract: true })
@Entity()
export class User {
  @Field(() => ID)
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
}
