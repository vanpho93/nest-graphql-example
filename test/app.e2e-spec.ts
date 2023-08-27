import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('healthcheck works', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: '{healthcheck{ok}}',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.healthcheck).toEqual({ ok: true });
      });
  });

  it('create user', () => {
    const query = `
      mutation {
        createUser(createUserInput: {
          email: "foo-${Date.now()}@example.com",
          name: "Foo"
        }) {
          name
        }
      }
    `;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.createUser).toEqual({
          name: 'Foo',
        });
      });
  });

  afterAll(async () => {
    app.close();
  });
});
