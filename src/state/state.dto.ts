import { IsString, IsNotEmpty, IsEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddState {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly shortCode: string;

  @IsEmpty()
  @ApiProperty()
  userId: number;
}
