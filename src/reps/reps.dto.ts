import { IsString, IsNotEmpty, IsAlpha, IsNumber } from 'class-validator';

export class CreateRep {
  @IsString()
  @IsNotEmpty()
  readonly names: string;

  @IsNumber()
  @IsNotEmpty()
  readonly constituencyId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly yearsInOffice: number;

  @IsString()
  @IsNotEmpty()
  readonly previousOffice: string;
}
