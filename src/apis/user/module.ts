import { Module } from '@nestjs/common';
import { TypeOrmEntityModule } from '@/typeorm';
import { CreateUserResolver } from './create';
import { ListUserResolver } from './list';
import { FieldResolvers } from './field-resolvers';

@Module({
  imports: [TypeOrmEntityModule],
  providers: [CreateUserResolver, ListUserResolver, FieldResolvers],
})
export class UserModule {}
