import * as graphql from 'graphql';
import { Property } from '../dryerjs';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Author {
  @Property(() => graphql.GraphQLID)
  @Prop()
  id: string;

  @Property(() => graphql.GraphQLString)
  @Prop()
  name: string;
}
