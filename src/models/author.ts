import * as graphql from 'graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OutputProperty, Property, Typer, Entity } from '../dryerjs';

@Entity()
@Schema()
export class Book {
  @Property(() => graphql.GraphQLID)
  id: string;

  @Property(() => graphql.GraphQLString)
  @Prop()
  name: string;
}

@Schema()
export class Author {
  @Property(() => graphql.GraphQLID)
  id: string;

  @Property(() => graphql.GraphQLString)
  @Prop()
  name: string;

  @Property(() => [Typer.getInputType(Book)])
  @OutputProperty(() => [Typer.getObjectType(Book)])
  @Prop({ type: [SchemaFactory.createForClass(Book)] })
  books: Book[];
}
