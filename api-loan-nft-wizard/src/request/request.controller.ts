import { Body, Controller, Post, Param } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dtos/createRequest.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('request')
@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) { }

  @ApiOkResponse({
    description:
      'this api used for create a request to the offer, if the asset is not belong to the creator create of requets, throw error',
  })
  @Post()
  async createRequest(@Body() dto: CreateRequestDto) {
    return await this.requestService.createRequest(dto);
  }

  @ApiOkResponse({
    description:
      'this api used for update status request had approve by lender, and change status of rest request to reject',
  })
  @Post('finalize-request/:id')
  async finalizeRequest(@Param('id') id: string) {
    return this.requestService.finalizeRequest(+id);
  }
}
