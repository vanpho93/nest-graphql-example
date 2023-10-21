import {
  ReturnTypeFunc,
  ReturnTypeFuncValue,
  FieldOptions,
  GqlTypeReference,
} from '@nestjs/graphql';

export const cached = {};

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
    cached[target.constructor.name] = {
      ...(cached[target.constructor.name] || {}),
      [propertyKey]: {
        returnTypeFunction,
        options,
      },
    };
  };
}
