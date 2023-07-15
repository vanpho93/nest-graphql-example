import { Args, ArgsType, Field, Int, Query, Resolver } from '@nestjs/graphql';
import { Min, Max } from 'class-validator';
import { EntityProvider, Recipe, RecipeObjectType } from '@/entity';

@ArgsType()
export class RecipesArgs {
  @Field(() => Int)
  @Min(0)
  skip = 0;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  take = 25;
}

@Resolver(() => RecipeObjectType)
export class ListRecipeResolver {
  constructor(private readonly entity: EntityProvider) {}

  @Query(() => [RecipeObjectType])
  async recipes(@Args() { skip, take }: RecipesArgs): Promise<Recipe[]> {
    const recipes = await this.entity.Recipe.find().skip(skip).limit(take);
    return recipes;
  }
}
