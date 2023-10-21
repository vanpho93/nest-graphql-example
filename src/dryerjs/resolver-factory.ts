import * as graphql from 'graphql';
import {
  Resolver,
  Query,
  Args,
  ObjectType,
  InputType,
  Mutation,
} from '@nestjs/graphql';
import { Definition } from './shared';
import { Typer } from './typer';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export function createResolver(definition: Definition) {
  @InputType(`Create${definition.name}Input`)
  class GeneratedInputType extends Typer.getInputType(definition) {}

  @ObjectType(definition.name)
  class GeneratedObjectType extends Typer.getObjectType(definition) {}

  @Resolver()
  class GeneratedResolver<T> {
    constructor(@InjectModel(definition.name) public model: Model<any>) {}

    @Mutation(() => GeneratedObjectType)
    async [`create${definition.name}`](
      @Args('input', { type: () => GeneratedInputType })
      input: any,
    ) {
      return await this.model.create(input);
    }

    @Query(() => GeneratedObjectType)
    async [definition.name.toLowerCase()](
      @Args('id', { type: () => graphql.GraphQLID }) id: string,
    ): Promise<T> {
      const result = await this.model.findById(id);
      return result;
    }
  }

  return GeneratedResolver;
}
