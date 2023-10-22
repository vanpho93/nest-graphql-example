import * as graphql from 'graphql';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ValidationPipe } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Definition } from './shared';
import { Typer } from './typer';

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
      return plainToInstance(
        Typer.getObjectType(definition) as any,
        created.toObject(),
      );
    }

    @Query(() => Typer.getObjectType(definition))
    async [definition.name.toLowerCase()](
      @Args('id', { type: () => graphql.GraphQLID }) id: string,
    ): Promise<T> {
      const result = await this.model.findById(id);
      return plainToInstance(
        Typer.getObjectType(definition) as any,
        result.toObject(),
      ) as any;
    }
  }

  return GeneratedResolver;
}
