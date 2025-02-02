import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';
import { projectConfig } from './config/config';

async function bootstrap() {
  const logger = new ConsoleLogger('Eleven-V');

  const app = await NestFactory.create(AppModule, {
    logger: logger,
  });

  await app.listen(projectConfig.port);
  logger.log(`** 🚀 Application is running on port ${process.env.PORT} 🚀 **`);
}
bootstrap();
