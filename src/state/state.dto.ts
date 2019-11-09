import { IsString, IsNotEmpty, IsNumber, IsEmpty } from 'class-validator';

export class AddState {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly shortCode: string;

  @IsEmpty()
  userId: number;
}
