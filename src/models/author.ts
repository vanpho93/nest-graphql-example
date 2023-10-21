import * as graphql from 'graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Property } from '../dryerjs';

@Schema()
export class Author {
  @Property(() => graphql.GraphQLID)
  id: string;

  @Property(() => graphql.GraphQLString)
  @Prop()
  name: string;
}
