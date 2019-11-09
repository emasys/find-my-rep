import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UserTokenProp {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNumber()
  @IsNotEmpty()
  id: string;
}
