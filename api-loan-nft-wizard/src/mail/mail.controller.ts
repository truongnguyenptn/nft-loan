import { Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('mail')
@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('/request-borrow')
  async requestBorrow() {
    await this.mailService.notifyLenderHaveRequestBorrow();

    return {
      message: 'Successful notifi to lender',
    };
  }
}
