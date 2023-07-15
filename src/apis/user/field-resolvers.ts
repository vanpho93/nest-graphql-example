import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { EntityProvider, Recipe, User, UserObjectType } from '@/entity';

@Resolver(() => UserObjectType)
export class FieldResolvers {
  constructor(private readonly entity: EntityProvider) {}

  @ResolveField()
  async recipes(@Parent() user: User): Promise<Recipe[]> {
    const recipes = await this.entity.Recipe.find({
      userId: new Types.ObjectId(user.id),
    });
    return recipes;
  }
}
