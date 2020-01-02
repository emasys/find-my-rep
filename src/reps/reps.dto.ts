import { IsString, IsNotEmpty, IsNumber, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRep {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Raji Amaechi',
    description: 'The full names of a rep',
  })
  readonly names: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly constituencyId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly phone: number;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly yearsInOffice: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly previousOffice: string;
}

// tslint:disable-next-line:max-classes-per-file
export class RepParam {
  // @IsNumber()
  @IsNotEmpty()
  readonly id: number;
}
