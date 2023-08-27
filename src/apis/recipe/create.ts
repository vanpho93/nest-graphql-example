import { Args, InputType, Mutation, PickType, Resolver } from '@nestjs/graphql';
import { pubSub } from '@/apis/shared';
import { EntityProvider, Recipe, RecipeBase, RecipeObjectType } from '@/entity';

@InputType()
export class CreateRecipeInput extends PickType(RecipeBase, [
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
    const recipe = await this.entity.Recipe.create(createRecipeInput);
    pubSub.publish('recipeCreated', { recipeCreated: recipe });
    return recipe;
  }
}
