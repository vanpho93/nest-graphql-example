import * as _ from 'lodash';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { LogLevel } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logLevels = configService.get('LOG_LEVELS')?.split(/\s*,\s*/);
  if (_.isArray(logLevels) && !_.isEmpty(logLevels)) {
    app.useLogger(logLevels as LogLevel[]);
  }
  await app.listen(3000);
}
bootstrap();
