import * as graphql from 'graphql';
import { Model } from 'mongoose';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Typer } from '../dryerjs';
import { User } from '../models';
import { InjectModel } from '@nestjs/mongoose';

@Resolver()
export class AuthResolver {
  constructor(@InjectModel('User') private readonly User: Model<User>) {}

  @Mutation(() => Typer.getObjectType(User))
  async signUp(
    @Args('input', { type: () => Typer.getInputType(User) })
    input: Omit<User, 'id'>,
  ) {
    const result = await this.User.create(input);
    return result;
  }

  @Query(() => Typer.getObjectType(User))
  whoAmI(
    @Args('userId', { type: () => graphql.GraphQLString }) userId: string,
  ) {
    return this.User.findById(userId);
  }
}
