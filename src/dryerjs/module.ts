import { DynamicModule, Module } from '@nestjs/common';
import { Definition } from './shared';
import { createResolver } from './resolver-factory';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';

@Module({})
export class DryerModule {
  public static register(input: { definitions: Definition[] }): DynamicModule {
    const mongooseSchemas = input.definitions.map((definition) => ({
      name: definition.name,
      schema: SchemaFactory.createForClass(definition),
    }));

    return {
      module: DryerModule,
      imports: [MongooseModule.forFeature(mongooseSchemas)],
      providers: [...this.getProviders(input.definitions)],
    };
  }

  public static getProviders(definitions: Definition[]) {
    return definitions.map((definition) => createResolver(definition));
  }
}
