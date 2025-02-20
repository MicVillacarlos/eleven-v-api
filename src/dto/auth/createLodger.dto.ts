import {
  IsString,
  IsDate,
  IsEmail,
  IsOptional,
  IsNumber,
  IsPhoneNumber,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLodgerDto {
  @IsString()
  readonly first_name: string;

  @IsString()
  readonly last_name: string;

  @IsDate()
  @Type(() => Date)
  readonly birth_date: Date;

  @IsString()
  readonly sex: string;

  @IsString()
  readonly home_address: string;

  @IsPhoneNumber(null)
  readonly phone_number: string;

  @IsEmail({}, { message: 'Please enter a valid email.' })
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly emergency_contact_person?: string;

  @IsOptional()
  @IsPhoneNumber(null)
  readonly emergency_contact_number?: string;

  @IsOptional()
  @IsString()
  readonly occupation?: string;

  @IsOptional()
  @IsString()
  readonly company_or_school?: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  readonly number_of_room_occupants?: number;
}
