import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const logger = new ConsoleLogger('Eleven-V');

  const app = await NestFactory.create(AppModule, {
    logger: logger,
  });

  await app.listen(process.env.PORT);
  logger.log(`** 🚀 Application is running on port ${process.env.PORT} 🚀 **`);
}
bootstrap();
