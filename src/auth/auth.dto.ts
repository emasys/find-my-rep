import { IsString, IsNotEmpty } from 'class-validator';

export class Login {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
