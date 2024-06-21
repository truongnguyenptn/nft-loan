import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetListRequestsOfOfferDto {
  @ApiProperty()
  @IsNumber()
  offerId: number;
}
