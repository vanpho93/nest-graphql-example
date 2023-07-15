import { Args, InputType, Mutation, PickType, Resolver } from '@nestjs/graphql';
import { pubSub } from '@/apis/shared';
import { EntityProvider, UserObjectType, UserBase, User } from '@/entity';

@InputType()
export class CreateUserInput extends PickType(UserBase, ['email', 'name']) {}

@Resolver(() => UserObjectType)
export class CreateUserResolver {
  constructor(private readonly entity: EntityProvider) {}

  @Mutation(() => UserObjectType)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    const user = new this.entity.User(createUserInput);
    await user.validate();
    await user.save();
    pubSub.publish('UserCreated', { userCreated: user });
    return user;
  }
}
