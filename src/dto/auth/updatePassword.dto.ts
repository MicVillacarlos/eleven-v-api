import { IsString, IsStrongPassword } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  readonly id: string;

  @IsStrongPassword()
  readonly newPassword: string;

  @IsStrongPassword()
  readonly confirmNewPassword: string;

  @IsString()
  readonly oldPassword: string;
}
