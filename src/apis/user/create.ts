import { Args, InputType, Mutation, PickType, Resolver } from '@nestjs/graphql';
import { pubSub } from '@/apis/shared';
import { EntityProvider as TypeOrmEntityProvider, User } from '@/entities';
import { UserObjectType } from '@/entities/object-types';

@InputType()
export class CreateUserInput extends PickType(User, ['email', 'name']) {}

@Resolver(() => UserObjectType)
export class CreateUserResolver {
  constructor(private readonly entity: TypeOrmEntityProvider) {}

  @Mutation(() => UserObjectType)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    const user = await this.entity.User.save(createUserInput);
    pubSub.publish('UserCreated', { userCreated: user });
    return user;
  }
}
