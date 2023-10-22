import * as graphql from 'graphql';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ValidationPipe } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import * as util from './util';
import { Definition } from './shared';
import { Typer } from './typer';
import { embeddedCached } from './property';

export function createResolver(definition: Definition) {
  @Resolver()
  class GeneratedResolver<T> {
    constructor(@InjectModel(definition.name) public model: Model<any>) {}

    @Mutation(() => Typer.getObjectType(definition))
    async [`create${definition.name}`](
      @Args(
        'input',
        { type: () => Typer.getInputType(definition) },
        new ValidationPipe({
          transform: true,
          expectedType: Typer.getInputType(definition),
        }),
      )
      input: any,
    ) {
      const created = await this.model.create(input);
      return plainToInstance(Typer.getObjectType(definition), created.toObject());
    }

    @Query(() => Typer.getObjectType(definition))
    async [definition.name.toLowerCase()](
      @Args('id', { type: () => graphql.GraphQLID }) id: string,
    ): Promise<T> {
      const result = await this.model.findById(id);
      return plainToInstance(Typer.getObjectType(definition), result.toObject()) as any;
    }
  }

  return GeneratedResolver;
}

export function createResolverForEmbedded(definition: Definition, field: string) {
  const embeddedDefinition = embeddedCached[definition.name][field]();

  @Resolver()
  class GeneratedResolverForEmbedded<T> {
    constructor(@InjectModel(definition.name) public model: Model<any>) {}

    @Mutation(() => Typer.getObjectType(embeddedDefinition))
    async [`create${util.toPascalCase(definition.name)}${util.toPascalCase(field)}`](
      @Args(
        'input',
        { type: () => Typer.getInputType(embeddedDefinition) },
        new ValidationPipe({
          transform: true,
          expectedType: Typer.getInputType(embeddedDefinition),
        }),
      )
      input: any,
      @Args(`${util.toCamelCase(definition.name)}Id`, { type: () => graphql.GraphQLID }) parentId: string,
    ) {
      const parent = await this.model.findById(parentId).select(field);
      parent[field].push(input);
      await parent.save();
      const updatedParent = await this.model.findById(parentId).select(field);
      return plainToInstance(
        Typer.getObjectType(embeddedDefinition),
        (util.last(updatedParent[field]) as any).toObject(),
      );
    }

    @Query(() => Typer.getObjectType(definition))
    async [`${util.toCamelCase(definition.name)}${util.toPascalCase(field)}`](
      @Args('id', { type: () => graphql.GraphQLID }) id: string,
      @Args(`${util.toCamelCase(definition.name)}Id`, { type: () => graphql.GraphQLID }) parentId: string,
    ): Promise<T> {
      const parent = await this.model.findById(parentId).select(field);
      const result = parent[field].find((item: any) => item._id.toString() === id);
      const embeddedDefinition = Typer.getObjectType(embeddedCached[definition.name][field]());
      return plainToInstance(Typer.getObjectType(embeddedDefinition), result.toObject()) as any;
    }
  }

  return GeneratedResolverForEmbedded;
}
