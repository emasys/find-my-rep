import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEmail,
} from 'class-validator';

export class CreateRep {
  @IsString()
  @IsNotEmpty()
  readonly names: string;

  @IsNumber()
  @IsNotEmpty()
  readonly constituencyId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly phone: number;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNumber()
  @IsNotEmpty()
  readonly yearsInOffice: number;

  @IsString()
  @IsNotEmpty()
  readonly previousOffice: string;
}

// tslint:disable-next-line:max-classes-per-file
export class RepParam {
  // @IsNumber()
  @IsNotEmpty()
  readonly id: number;
}
