import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get()
  signUpAdmin() {
    return 'Hello';
  }
}
