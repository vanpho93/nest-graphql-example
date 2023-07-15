import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as mongoose from 'mongoose';
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

  it('/ (GET)', () => {
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

  afterAll(async () => {
    app.close();
    for (const connection of mongoose.connections) {
      await connection.close();
    }
  });
});
