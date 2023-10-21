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

export function createResolver(definition: Definition) {
  @InputType(`Create${definition.name}Input`)
  class GeneratedInputType extends Typer.getInputType(definition) {}

  @ObjectType(definition.name)
  class GeneratedObjectType extends Typer.getObjectType(definition) {}

  @Resolver()
  class GeneratedResolver<T> {
    @Mutation(() => GeneratedObjectType)
    [`create${definition.name}`](
      @Args('input', { type: () => GeneratedInputType })
      input: any,
    ) {
      return { ...input, id: 'test' };
    }

    @Query(() => GeneratedObjectType)
    async [definition.name.toLowerCase()](
      @Args('id', { type: () => graphql.GraphQLID }) id: string,
    ): Promise<T> {
      return { id, name: 'Brian' } as T;
    }
  }

  return GeneratedResolver;
}
