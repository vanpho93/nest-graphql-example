import {
  ReturnTypeFunc,
  ReturnTypeFuncValue,
  FieldOptions,
  GqlTypeReference,
} from '@nestjs/graphql';

export const defaultCached = {};
type FieldOptionsExtractor<T> = T extends [GqlTypeReference<infer P>]
  ? FieldOptions<P[]>
  : T extends GqlTypeReference<infer P>
  ? FieldOptions<P>
  : never;

export function Property<T extends ReturnTypeFuncValue>(
  returnTypeFunction?: ReturnTypeFunc<T>,
  options?: FieldOptionsExtractor<T>,
): PropertyDecorator & MethodDecorator {
  return (target: object, propertyKey: string) => {
    defaultCached[target.constructor.name] = {
      ...(defaultCached[target.constructor.name] || {}),
      [propertyKey]: {
        returnTypeFunction,
        options,
      },
    };
  };
}

export const objectCached = {};
export function OutputProperty<T extends ReturnTypeFuncValue>(
  returnTypeFunction?: ReturnTypeFunc<T>,
  options?: FieldOptionsExtractor<T>,
): PropertyDecorator & MethodDecorator {
  return (target: object, propertyKey: string) => {
    objectCached[target.constructor.name] = {
      ...(objectCached[target.constructor.name] || {}),
      [propertyKey]: {
        returnTypeFunction,
        options,
      },
    };
  };
}

export const thunkCached = {};
export function Thunk(value: any): PropertyDecorator & MethodDecorator {
  return (target: object, propertyKey: string) => {
    thunkCached[target.constructor.name] = {
      ...(thunkCached[target.constructor.name] || {}),
      [propertyKey]: [
        ...(thunkCached[target.constructor.name]?.[propertyKey] || []),
        value,
      ],
    };
  };
}
