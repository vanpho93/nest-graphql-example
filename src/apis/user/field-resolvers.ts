import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { EntityProvider, Recipe, User, UserObjectType } from '@/entities';

@Resolver(() => UserObjectType)
export class FieldResolvers {
  constructor(private readonly entity: EntityProvider) {}

  @ResolveField()
  async recipes(@Parent() user: User): Promise<Recipe[]> {
    const recipes = await this.entity.Recipe.find({
      where: { userId: user.id },
    });
    return recipes;
  }
}
