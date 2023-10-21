import * as graphql from 'graphql';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Definition } from './shared';
import { Typer } from './typer';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export function createResolver(definition: Definition) {
  @Resolver()
  class GeneratedResolver<T> {
    constructor(@InjectModel(definition.name) public model: Model<any>) {}

    @Mutation(() => Typer.getObjectType(definition))
    async [`create${definition.name}`](
      @Args('input', { type: () => Typer.getInputType(definition) })
      input: any,
    ) {
      return await this.model.create(input);
    }

    @Query(() => Typer.getObjectType(definition))
    async [definition.name.toLowerCase()](
      @Args('id', { type: () => graphql.GraphQLID }) id: string,
    ): Promise<T> {
      const result = await this.model.findById(id);
      return result;
    }
  }

  return GeneratedResolver;
}
