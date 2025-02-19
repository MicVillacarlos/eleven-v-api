import { ArrayNotEmpty, IsArray, IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  readonly room_type: string;

  @IsNumber()
  readonly price: number;

  @IsNumber()
  readonly number_of_rooms: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  readonly room_numbers?: Array<string>;
}
