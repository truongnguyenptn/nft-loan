import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CheckAssetIsOwnByPublickKeyDto {
  @ApiProperty()
  @IsString()
  assetId: string;

  @ApiProperty()
  @IsString()
  owner: string;
}

export class AssetIsOwnByPublicKeyDto extends CheckAssetIsOwnByPublickKeyDto {
  @ApiProperty()
  isOwn: boolean;
}
