import { BadRequestException, Injectable } from '@nestjs/common';
import { HeliusService } from 'src/helius/helius.service';
import { CreateRequestDto } from './dtos/createRequest.dto';
import { DATA_REQUESTS, REQUEST, REQUEST_STATUS } from 'src/common/data';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class RequestService {
  constructor(
    private readonly heliusService: HeliusService,
    private readonly mailService: MailService,
  ) { }

  async createRequest({ assetId, owner }: CreateRequestDto) {
    const isOwnAsset = await this.heliusService.checkAssetIsOwnByPublickKey({
      assetId,
      owner,
    });
    if (!isOwnAsset) {
      throw new BadRequestException('You are not the onwer of this Asset');
    }

    // CREATE A REQUEST BELONG TO USER ID 2, THIS USER WE USE TO RECEIVE FUNDS FROM LENDER
    const newRequest: REQUEST = {
      assetId,
      id: DATA_REQUESTS.length + 1,
      ownerId: 2,
      status: REQUEST_STATUS.PROCESSING,
      offerId: 1,
    };

    DATA_REQUESTS.unshift(newRequest);
    this.mailService.notifyLenderHaveRequestBorrow();
  }

  finalizeRequest(id: number) {
    DATA_REQUESTS.forEach((request) => {
      if (request.ownerId !== 2) {
        request.status = REQUEST_STATUS.REJECT;
      } else {
        request.status = REQUEST_STATUS.COMPLETE;
      }
    });
  }
}
