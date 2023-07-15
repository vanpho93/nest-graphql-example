import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe } from './recipe';
import { User } from './user';

@Injectable()
export class EntityProvider {
  public constructor(
    @InjectModel(Recipe.name) public Recipe: Model<Recipe>,
    @InjectModel(User.name) public User: Model<User>,
  ) {}
}
