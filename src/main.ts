import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';
import { projectConfig } from './config/config';

async function bootstrap() {
  const logger = new ConsoleLogger('Eleven-V');

  const app = await NestFactory.create(AppModule, {
    logger: logger,
  });

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(projectConfig.port);
  logger.log(
    `** 🚀 Application is running on port ${projectConfig.port} 🚀 **`,
  );
}
bootstrap();
