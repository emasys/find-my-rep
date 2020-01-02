import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchQuery {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly state: string;

  @IsString()
  @ApiProperty()
  readonly constituency: string;
}
