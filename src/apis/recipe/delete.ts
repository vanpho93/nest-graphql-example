import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { EntityProvider, RecipeObjectType } from '@/typeorm';

@Resolver(() => RecipeObjectType)
export class DeleteRecipeResolver {
  constructor(private readonly entity: EntityProvider) {}

  @Mutation(() => RecipeObjectType)
  async deleteRecipe(@Args('id') id: number): Promise<boolean> {
    const deleted = await this.entity.Recipe.delete(id);
    if (!deleted) {
      throw new NotFoundException('RECIPE_NOT_FOUND');
    }
    return true;
  }
}
