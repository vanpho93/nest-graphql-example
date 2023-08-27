import { ObjectType, Field } from '@nestjs/graphql';
import { Recipe } from './recipe';
import { User } from './user';

// bypass "ReferenceError: Cannot access 'UserObjectType' before initialization"
type UserObjectClonedType = UserObjectType;

@ObjectType('Recipe')
export class RecipeObjectType extends Recipe {
  @Field(() => UserObjectType)
  user: UserObjectClonedType;
}

@ObjectType('User')
export class UserObjectType extends User {
  @Field(() => [RecipeObjectType])
  recipes: RecipeObjectType[];
}
