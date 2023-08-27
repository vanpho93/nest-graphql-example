/* eslint-disable @typescript-eslint/no-unused-vars */
import * as _ from 'lodash';
import { Injectable, Logger } from '@nestjs/common';
import { EntityProvider } from './entity.provider';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedingService {
  public constructor(
    private readonly configService: ConfigService,
    private readonly entityProvider: EntityProvider,
  ) {}

  private logger = new Logger(SeedingService.name);

  public async onModuleInit() {
    if (this.configService.get('NODE_ENV') !== 'local') {
      this.logger.debug(
        `Skipping seeding in ${this.configService.get('NODE_ENV')}`,
      );
      return;
    }
    if (this.configService.get('SEED_SAMPLE_DATA') !== 'true') {
      this.logger.debug(`Skipping seeding as SEED_SAMPLE_DATA is not true`);
      return;
    }
    const count = await this.entityProvider.Recipe.count();
    if (count > 0) {
      this.logger.debug(`Skipping seeding as there are already recipes`);
      return;
    }
    await this.seed();
  }

  private async seed() {
    this.logger.debug(`Seeding sample data`);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { faker } = require('@faker-js/faker');

    const NUMBER_OF_USERS = 3;
    const NUMBER_OF_RECIPES_PER_USER = 15;
    for (const _userIndex of _.range(NUMBER_OF_USERS)) {
      const user = await this.entityProvider.User.save({
        email: faker.internet.email(),
        name: faker.person.fullName(),
      });
      for (const _recipeIndex of _.range(NUMBER_OF_RECIPES_PER_USER)) {
        const recipe = await this.entityProvider.Recipe.save({
          title: faker.lorem.words(4),
          description: faker.lorem.paragraph(),
          userId: user.id,
          ingredients: [
            faker.lorem.word(),
            faker.lorem.word(),
            faker.lorem.word(),
          ],
        });
        this.logger.debug(
          `Created recipe ${recipe.title} for user ${user.email}`,
        );
      }
    }
    this.logger.debug(`Seeding complete`);
  }
}
