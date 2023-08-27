import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user';
import { Recipe } from './recipe';
import { EntityProvider } from './entity.provider';

@Module({
  imports: [TypeOrmModule.forFeature([User, Recipe])],
  exports: [EntityProvider],
  providers: [EntityProvider],
})
export class EntityModule {}
