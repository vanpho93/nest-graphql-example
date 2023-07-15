import { ObjectType, Field } from '@nestjs/graphql';
import { RecipeBase } from './recipe';
import { UserBase } from './user';

// bypass "ReferenceError: Cannot access 'UserObjectType' before initialization"
type UserObjectClonedType = UserObjectType;

@ObjectType('Recipe')
export class RecipeObjectType extends RecipeBase {
  @Field(() => UserObjectType)
  user: UserObjectClonedType;
}

@ObjectType('User')
export class UserObjectType extends UserBase {
  @Field(() => [RecipeObjectType])
  recipes: RecipeObjectType[];
}
