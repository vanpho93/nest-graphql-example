import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { EntityProvider, Recipe, RecipeObjectType, User } from '@/entity';

@Resolver(() => RecipeObjectType)
export class FieldResolvers {
  constructor(private readonly entity: EntityProvider) {}

  @ResolveField()
  async user(@Parent() recipe: Recipe): Promise<User> {
    return await this.entity.User.findOne({ where: { id: recipe.userId } });
  }
}
