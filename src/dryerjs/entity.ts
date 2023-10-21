import { Typer } from './typer';

export function Entity(): ClassDecorator {
  return (target: object) => {
    Typer.getInputType(target);
    Typer.getObjectType(target);
  };
}
