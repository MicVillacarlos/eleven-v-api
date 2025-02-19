import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { projectConfig } from '../../../config/config';
import { RoomSchema } from '../../../schemas/room.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: projectConfig.jwtSecret,
        signOptions: { expiresIn: projectConfig.jwtExpire },
      }),
    }),
    MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }]),
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
