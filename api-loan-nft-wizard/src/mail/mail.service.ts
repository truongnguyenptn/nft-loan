import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ROLE } from 'src/common/data';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
  ) { }

  async notifyLenderHaveRequestBorrow(): Promise<void> {
    const lender = this.userService.findUserByRole(ROLE.LENDER);
    const borrower = this.userService.findUserByRole(ROLE.BORROWER);

    await this.sendMailUserRequestBorrowMoney({
      lenderEmail: lender.email,
      borrowerEmail: borrower.email,
      borrowerAddress: borrower.publickKey,
    });
  }

  async sendMailUserRequestBorrowMoney({
    lenderEmail,
    borrowerEmail,
    borrowerAddress,
  }: {
    lenderEmail: string;
    borrowerEmail: string;
    borrowerAddress: string;
  }): Promise<void> {
    await this.mailerService.sendMail({
      to: lenderEmail,
      subject: 'Request borrow money',
      template: './request-borrow',
      context: {
        lenderEmail,
        borrowerEmail,
        borrowerAddress,
      },
    });
  }

  async sendMailTransferMoney(email: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Transfer money success',
      template: './transfer-money.ejs',
      context: {
        email,
      },
    });
  }
}
