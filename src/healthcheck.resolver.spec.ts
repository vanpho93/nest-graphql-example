import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckResolver } from './healthcheck.resolver';

describe('HealthcheckResolver', () => {
  it('works', async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [HealthCheckResolver],
    }).compile();

    const healthCheckResolver =
      moduleRef.get<HealthCheckResolver>(HealthCheckResolver);
    expect(await healthCheckResolver.healthcheck()).toStrictEqual({ ok: true });
  });
});
