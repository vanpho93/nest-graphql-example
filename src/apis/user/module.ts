import { Module } from '@nestjs/common';
import { EntityModule } from '@/entity';
import { CreateUserResolver } from './create';
import { ListUserResolver } from './list';
import { FieldResolvers } from './field-resolvers';

@Module({
  imports: [EntityModule],
  providers: [CreateUserResolver, ListUserResolver, FieldResolvers],
})
export class UserModule {}
