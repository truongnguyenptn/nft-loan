import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection, VersionedTransactionResponse } from '@solana/web3.js';
import axios from 'axios';
import {
  DEVNET_RPC_URL,
  ELUSIV_KEY,
  URL_HELIUS_DAS,
} from 'src/common/environments';
import { AssetType, TransactionLogWebhook } from 'src/common/types';
import {
  AssetIsOwnByPublicKeyDto,
  CheckAssetIsOwnByPublickKeyDto,
} from './dtos/checkAssetOwnByPublickKey.dto';
import { UserService } from 'src/user/user.service';
import { ROLE } from 'src/common/data';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class HeliusService {
  private connection: Connection;

  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {
    this.connection = new Connection(DEVNET_RPC_URL);
  }

  async sendNotifiOfElusivTransaction(
    transaction: TransactionLogWebhook[],
  ): Promise<boolean> {
    const tx = transaction[0];

    const txLog: VersionedTransactionResponse =
      await this.connection.getTransaction(tx.signature, {
        commitment: 'confirmed',
        maxSupportedTransactionVersion: 1,
      });

    if (!this.checkIsTransactionSendByElusiv(txLog.meta.logMessages)) return;

    // SEND INFORMATION TO LENDER AND BORROWER BY EMAIL
    const lender = this.userService.findUserByRole(ROLE.LENDER);
    const borrower = this.userService.findUserByRole(ROLE.BORROWER);

    const sendMailToLender = this.mailService.sendMailTransferMoney(
      lender.email,
    );
    const sendMailToBorrower = this.mailService.sendMailTransferMoney(
      borrower.email,
    );
    await Promise.all([sendMailToBorrower, sendMailToLender]);
  }

  async checkAssetIsOwnByPublickKey({
    assetId,
    owner,
  }: CheckAssetIsOwnByPublickKeyDto): Promise<boolean> {
    const assetInfo = await this.getAssetById(assetId);

    return assetInfo.ownership.owner === owner;
  }

  async getAssetById(assetId: string): Promise<AssetType> {
    const { data } = await axios(URL_HELIUS_DAS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        jsonrpc: '2.0',
        id: 'my-id',
        method: 'getAsset',
        params: {
          id: assetId,
        },
      }),
    });

    if (data.error) throw new NotFoundException(data.error.message);
    const assetInfo = data.result as AssetType;

    return assetInfo;
  }

  checkIsTransactionSendByElusiv(logMessage: string[]): boolean {
    let isTransactionSendByElusiv = false;
    for (const message of logMessage) {
      if (message.includes(ELUSIV_KEY)) {
        isTransactionSendByElusiv = true;

        return isTransactionSendByElusiv;
      }
    }

    return isTransactionSendByElusiv;
  }
}
