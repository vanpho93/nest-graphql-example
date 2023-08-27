import { Args, ArgsType, Field, Int, Query, Resolver } from '@nestjs/graphql';
import { Min, Max } from 'class-validator';
import { EntityProvider, User, UserObjectType } from '@/typeorm';

@ArgsType()
export class UsersArgs {
  @Field(() => Int)
  @Min(0)
  skip = 0;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  take = 25;
}

@Resolver(() => UserObjectType)
export class ListUserResolver {
  constructor(private readonly entity: EntityProvider) {}

  @Query(() => [UserObjectType])
  async users(@Args() { skip, take }: UsersArgs): Promise<User[]> {
    const users = await this.entity.User.find({
      skip,
      take,
    });
    return users;
  }
}
