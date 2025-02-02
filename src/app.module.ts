import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './modules/auth/auth.controller';
import { projectConfig } from './config/config';

const logger = new Logger('MongoDB');

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: projectConfig.mongoDbConnect,
        dbName: projectConfig.mongoDbDatabaseName,
        connectionFactory: (connection) => {
          connection.on('connected', () =>
            logger.log('** ✅ Connected to MongoDB ✅ **'),
          );
          connection.on('error', (error) =>
            logger.error(`❌MongoDB connection error: ${error}`),
          );
          connection.on('disconnected', () =>
            logger.warn('❌MongoDB disconnected❌'),
          );
          return connection;
        },
      }),
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
