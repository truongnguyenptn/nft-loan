import { Module } from '@nestjs/common';
import { HeliusService } from './helius.service';
import { HeliusController } from './helius.controller';
import { UserModule } from 'src/user/user.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [UserModule, MailModule],
  providers: [HeliusService],
  controllers: [HeliusController],
  exports: [HeliusService],
})
export class HeliusModule {}
