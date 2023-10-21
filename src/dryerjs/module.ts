import { DynamicModule, Module } from '@nestjs/common';
import { Definition } from './shared';
import { createResolver } from './resolver-factory';

@Module({})
export class DryerModule {
  public static register(input: { definitions: Definition[] }): DynamicModule {
    return {
      module: DryerModule,
      providers: this.getProviders(input.definitions),
    };
  }

  public static getProviders(definitions: Definition[]) {
    return definitions.map((definition) => createResolver(definition));
  }
}
