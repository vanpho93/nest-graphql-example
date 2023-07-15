import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';

@ObjectType({ description: 'healthcheck' })
class HealthCheck {
  @Field()
  ok: boolean;
}

@Resolver(() => HealthCheck)
export class HealthCheckResolver {
  @Query(() => HealthCheck)
  async healthcheck(): Promise<HealthCheck> {
    return { ok: true };
  }
}
