import * as graphql from 'graphql';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { OutputProperty, Property, Typer, Entity, Embedded } from '../dryerjs';

@Entity()
export class Book {
  @Property(() => graphql.GraphQLID)
  id: string;

  @Property(() => graphql.GraphQLString)
  @Prop()
  name: string;
}

@Entity()
export class Author {
  @Property(() => graphql.GraphQLID)
  id: string;

  @Property(() => graphql.GraphQLString)
  @Prop()
  name: string;

  @Embedded(() => Book)
  @Property(() => [Typer.getInputType(Book)])
  @OutputProperty(() => [Typer.getObjectType(Book)])
  @Prop({ type: [SchemaFactory.createForClass(Book)] })
  books: Book[];
}
