import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDate, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @ApiProperty({ example: 'Rock Konseri' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Harika bir rock konseri' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: '2024-03-15T20:00:00Z' })
  @Type(() => Date)
  @IsDate()
  date: Date;

  @ApiProperty({ example: 'İstanbul' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ example: 'Kadıköy' })
  @IsNotEmpty()
  @IsString()
  district: string;

  @ApiProperty({ example: 'Konser alanı tam adresi' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsPositive()
  totalTickets: number;

  @ApiProperty({ example: 250.00 })
  @IsNumber()
  @Min(0)
  ticketPrice: number;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  image: string;
}