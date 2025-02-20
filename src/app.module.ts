import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { projectConfig } from './config/config';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { RoomModule } from './modules/room/room/room.module';
import { UsersModule } from './modules/users/users/users.module';

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
    AuthModule,
    UsersModule,
    RoomModule,
  ],
  controllers: [AuthController],
})
export class AppModule {}
