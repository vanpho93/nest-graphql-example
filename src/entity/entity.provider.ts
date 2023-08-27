import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user';
import { Recipe } from './recipe';

@Injectable()
export class EntityProvider {
  public constructor(
    @InjectRepository(User) public User: Repository<User>,
    @InjectRepository(Recipe) public Recipe: Repository<Recipe>,
  ) {}
}
