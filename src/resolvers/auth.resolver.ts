import * as graphql from 'graphql';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Typer } from '../dryerjs';
import { User } from '../models';
import { ValidationPipe } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(@InjectModel('User') private readonly User: Model<User>) {}

  @Mutation(() => Typer.getObjectType(User))
  async signUp(
    @Args(
      'input',
      { type: () => Typer.getInputType(User) },
      new ValidationPipe({
        transform: true,
        expectedType: Typer.getInputType(User),
      }),
    )
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
}
