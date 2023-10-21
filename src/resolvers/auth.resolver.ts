import * as graphql from 'graphql';
import { Model } from 'mongoose';
import { IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
import { InjectModel } from '@nestjs/mongoose';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  InputType,
  Field,
} from '@nestjs/graphql';
import { Typer } from '../dryerjs';
import { User } from '../models';

@InputType()
class UserEmail {
  @Field(() => graphql.GraphQLString)
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;
}

@Resolver()
export class AuthResolver {
  constructor(@InjectModel('User') private readonly User: Model<User>) {}

  @Mutation(() => Typer.getObjectType(User))
  async signUp(
    @Args('input', { type: () => Typer.getInputType(User) })
    input: Omit<User, 'id'>,
  ) {
    return await this.User.create(input);
  }

  @Query(() => Typer.getObjectType(User))
  async whoAmI(
    @Args('userId', { type: () => graphql.GraphQLString }) userId: string,
  ) {
    return await this.User.findById(userId);
  }

  @Query(() => Typer.getObjectType(User))
  async getUserByEmail(
    @Args('input', { type: () => UserEmail }) input: UserEmail,
  ) {
    return await this.User.findOne(input);
  }
}
