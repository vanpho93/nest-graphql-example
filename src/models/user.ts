import * as graphql from 'graphql';
import { Prop } from '@nestjs/mongoose';
import { Property, Entity } from '../dryerjs';

@Entity()
export class User {
  @Property(() => graphql.GraphQLID)
  id: string;

  @Property(() => graphql.GraphQLString)
  @Prop()
  name: string;

  @Property()
  @Prop({ unique: true })
  email: string;

  @Property()
  @Prop()
  password: string;
}
