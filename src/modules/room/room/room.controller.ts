import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../helpers/auth.guard.helper/auth.guard.helper';
import { CreateRoomDto } from '../../../dto/auth/createRoom.dto';
import { RoomService } from './room.service';

@Controller('admin/room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create-room')
  createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.createRoom(createRoomDto);
  }
}
