import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class SearchQuery {
  @IsString()
  readonly name: string;

  @IsString()
  readonly state: string;

  @IsString()
  readonly constituency: string;
}
