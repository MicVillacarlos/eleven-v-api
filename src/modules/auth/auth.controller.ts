import { Controller, Get } from '@nestjs/common';
import { sendEmail } from '../../helpers/email-helper/email-helpers';

@Controller('auth')
export class AuthController {
  @Get()
  signUpAdmin() {
    return sendEmail('micvillacarlos@gmail.com', '8999');
  }
}
