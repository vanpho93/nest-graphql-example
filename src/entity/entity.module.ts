import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user';
import { Recipe } from './recipe';
import { EntityProvider } from './entity.provider';
import { SeedingService } from './seeding.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Recipe])],
  exports: [EntityProvider],
  providers: [EntityProvider, SeedingService],
})
export class EntityModule {}
