import { Body, Controller, Post } from '@nestjs/common';
import { HeliusService } from './helius.service';
import { TransactionLogWebhook } from 'src/common/types';
import {
  AssetIsOwnByPublicKeyDto,
  CheckAssetIsOwnByPublickKeyDto,
} from './dtos/checkAssetOwnByPublickKey.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('helius-api')
@Controller('helius')
export class HeliusController {
  constructor(private readonly heliusService: HeliusService) {}

  @Post('/webhooks')
  async webhook(@Body() body: TransactionLogWebhook[]) {
    await this.heliusService.sendNotifiOfElusivTransaction(body);
    return {
      message: 'Success send notification',
    };
  }

  // @ApiOkResponse({
  //   description: 'Return is asset own by publick key',
  //   type: AssetIsOwnByPublicKeyDto,
  // })
  // @Post('/asset/check-is-own-by-public-key')
  // async checkIsOwnerOwnAsset(
  //   @Body() { assetId, owner }: CheckAssetIsOwnByPublickKeyDto,
  // ) {
  //   return await this.heliusService.checkAssetIsOwnByPublickKey({
  //     assetId,
  //     owner,
  //   });
  // }
}
