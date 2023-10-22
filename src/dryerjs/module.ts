import { DynamicModule, Module } from '@nestjs/common';
import { Definition } from './shared';
import { createResolver, createResolverForEmbedded } from './resolver-factory';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { embeddedCached } from './property';

@Module({})
export class DryerModule {
  public static MongooseModuleForFeatureModule: DynamicModule;

  public static register(input: { definitions: Definition[] }): DynamicModule {
    const providers = [];
    input.definitions.forEach(definition => providers.push(createResolver(definition)));
    input.definitions.forEach(definition => {
      for (const property in embeddedCached[definition.name] || {}) {
        providers.push(createResolverForEmbedded(definition, property));
      }
    });

    return {
      module: DryerModule,
      imports: [
        MongooseModule.forFeature(
          input.definitions.map(definition => ({
            name: definition.name,
            schema: SchemaFactory.createForClass(definition),
          })),
        ),
      ],
      providers,
    };
  }
}
