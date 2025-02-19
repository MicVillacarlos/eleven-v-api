import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from '../../../schemas/room.schema';
import { Model } from 'mongoose';
import { CreateRoomDto } from '../../../dto/auth/createRoom.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel('Room')
    private roomModel: Model<Room>,
  ) {}

  async createRoom(data: CreateRoomDto): Promise<{ room: any }> {
    const { room_type, number_of_rooms, price, room_numbers } = data;

    let roomNumbers = room_numbers;
    const generateRoomNumbers = (count: number): string[] => {
      return Array.from({ length: count }, (_, i) => `RM ${i + 1}`);
    };

    if (!room_numbers || !room_numbers.length) {
      roomNumbers = generateRoomNumbers(number_of_rooms);
    }

    const room = await this.roomModel.create({
      room_type,
      price,
      number_of_rooms,
      room_numbers: roomNumbers,
    });

    return { room: room };
  }
}
