import * as graphql from 'graphql';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ValidationPipe } from '@nestjs/common';
import { Typer } from '../dryerjs';
import { User } from '../models';

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
    const user = await this.User.create(input);
    return plainToInstance(Typer.getObjectType(User), user.toObject());
  }

  @Query(() => Typer.getObjectType(User))
  async whoAmI(@Args('userId', { type: () => graphql.GraphQLString }) userId: string) {
    const user = await this.User.findById(userId);
    return plainToInstance(Typer.getObjectType(User), user.toObject());
  }
}
