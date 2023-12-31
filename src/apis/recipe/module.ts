import { Module } from '@nestjs/common';
import { EntityModule } from '@/entity';
import { CreateRecipeResolver } from './create';
import { GetRecipeResolver } from './get';
import { ListRecipeResolver } from './list';
import { DeleteRecipeResolver } from './delete';
import { FieldResolvers } from './field-resolvers';

@Module({
  imports: [EntityModule],
  providers: [
    CreateRecipeResolver,
    GetRecipeResolver,
    ListRecipeResolver,
    DeleteRecipeResolver,
    FieldResolvers,
  ],
})
export class RecipeModule {}
