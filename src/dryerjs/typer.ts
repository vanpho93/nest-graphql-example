import { ObjectType, Field, InputType } from '@nestjs/graphql';

import { Definition } from './shared';
import { cached } from './property';

function getInputType(definition: Definition) {
  @InputType({ isAbstract: true })
  class AbstractInput {}
  for (const property of Object.keys(cached[definition.name])) {
    const designType = Reflect.getMetadata(
      'design:type',
      definition.prototype,
      property,
    );
    Reflect.defineMetadata(
      'design:type',
      designType,
      AbstractInput.prototype,
      property,
    );
    const { returnTypeFunction, options } = cached[definition.name][property];
    Field(returnTypeFunction, options)(
      AbstractInput.prototype,
      property as string,
    );
  }
  return AbstractInput;
}

function getObjectType(definition: Definition) {
  @ObjectType({ isAbstract: true })
  class AbstractOutput {}
  for (const property of Object.keys(cached[definition.name])) {
    const designType = Reflect.getMetadata(
      'design:type',
      definition.prototype,
      property,
    );
    Reflect.defineMetadata(
      'design:type',
      designType,
      AbstractOutput.prototype,
      property,
    );
    const { returnTypeFunction, options } = cached[definition.name][property];
    Field(returnTypeFunction, options)(
      AbstractOutput.prototype,
      property as string,
    );
  }
  return AbstractOutput;
}

export class Typer {
  public static getInputType(definition: Definition) {
    return getInputType(definition);
  }

  public static getObjectType(definition: Definition) {
    return getObjectType(definition);
  }
}
