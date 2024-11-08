import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ 
    example: 'johndoe', 
    description: 'Kullanıcı adı'
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ 
    example: 'password123', 
    description: 'Kullanıcı şifresi'
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}