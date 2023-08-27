import { Args, InputType, Mutation, PickType, Resolver } from '@nestjs/graphql';
import { pubSub } from '@/apis/shared';
import { EntityProvider, Recipe, RecipeObjectType } from '@/entities';

@InputType()
export class CreateRecipeInput extends PickType(Recipe, [
  'title',
  'description',
  'ingredients',
  'userId',
]) {}

@Resolver(() => RecipeObjectType)
export class CreateRecipeResolver {
  constructor(private readonly entity: EntityProvider) {}

  @Mutation(() => RecipeObjectType)
  async createRecipe(
    @Args('createRecipeInput') createRecipeInput: CreateRecipeInput,
  ): Promise<Recipe> {
    const recipe = await this.entity.Recipe.save(createRecipeInput);
    pubSub.publish('recipeCreated', { recipeCreated: recipe });
    return recipe;
  }
}
