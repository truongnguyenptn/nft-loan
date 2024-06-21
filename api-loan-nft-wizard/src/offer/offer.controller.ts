import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OfferService } from './offer.service';
import { REQUEST } from 'src/common/data';

@ApiTags('offer')
@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) { }

  @Get(':id')
  getListRequestOfOffer(@Param('id') id: number) {
    return this.offerService.getListRequestsOfOffer(id);
  }
}
