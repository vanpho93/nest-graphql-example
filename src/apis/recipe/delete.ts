import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { EntityProvider, RecipeObjectType } from '@/entity';

@Resolver(() => RecipeObjectType)
export class DeleteRecipeResolver {
  constructor(private readonly entity: EntityProvider) {}

  @Mutation(() => RecipeObjectType)
  async deleteRecipe(@Args('id') id: string): Promise<boolean> {
    const deleted = await this.entity.Recipe.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException('RECIPE_NOT_FOUND');
    }
    return true;
  }
}
