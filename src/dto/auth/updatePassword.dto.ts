import { IsString, IsStrongPassword } from 'class-validator';

export class UpdatePasswordDto {
  @IsStrongPassword()
  readonly newPassword: string;

  @IsStrongPassword()
  readonly confirmNewPassword: string;

  @IsString()
  readonly oldPassword: string;
}
