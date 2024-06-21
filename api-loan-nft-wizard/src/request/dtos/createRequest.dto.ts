import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRequestDto {
  @ApiProperty()
  @IsString()
  assetId: string;

  @ApiProperty()
  @IsString()
  owner: string;
}
