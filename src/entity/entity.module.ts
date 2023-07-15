import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RecipeSchema } from './recipe';
import { UserSchema } from './user';
import { EntityProvider } from './entity.provider';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Recipe', schema: RecipeSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [EntityProvider],
  exports: [EntityProvider],
})
export class EntityModule {}
