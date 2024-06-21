import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeliusModule } from './helius/helius.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RequestModule } from './request/request.module';
import { OfferModule } from './offer/offer.module';

@Module({
  imports: [
    HeliusModule,
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    RequestModule,
    OfferModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
