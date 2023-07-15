import { Args, Query, Resolver } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { EntityProvider, Recipe, RecipeObjectType } from '@/entity';

@Resolver(() => RecipeObjectType)
export class GetRecipeResolver {
  constructor(private readonly entity: EntityProvider) {}

  @Query(() => RecipeObjectType)
  async recipe(@Args('id') id: string): Promise<Recipe> {
    const recipe = await this.entity.Recipe.findById(id);
    if (!recipe) {
      throw new NotFoundException('RECIPE_NOT_FOUND');
    }
    return recipe;
  }
}
