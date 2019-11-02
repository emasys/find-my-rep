import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class AddConst {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly stateId: number;
}
