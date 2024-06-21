import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { HeliusModule } from 'src/helius/helius.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [HeliusModule, MailModule],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule { }
