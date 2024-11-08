import { IsNotEmpty, IsString, IsEmail, IsOptional, IsNumber, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'johndoe', description: 'Username' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @ApiProperty({ example: 'password123', description: 'Password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email address' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @IsString()
  @IsOptional()
  surname?: string;

  @ApiProperty({ example: 25, description: 'Age' })
  @IsNumber()
  @IsOptional()
  age?: number;

  @ApiProperty({ example: '+905551234567', description: 'Phone number' })
  @IsString()
  @IsOptional()
  phoneNumber?: string;
}