import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsDate, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEventDto {
  @ApiProperty({ example: 'Rock Konseri', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'Harika bir rock konseri', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2024-03-15T20:00:00Z', required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date;

  @ApiProperty({ example: 'İstanbul', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ example: 'Kadıköy', required: false })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiProperty({ example: 'Konser alanı tam adresi', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 100, required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  totalTickets?: number;

  @ApiProperty({ example: 250.00, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  ticketPrice?: number;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  @IsOptional()
  @IsString()
  image?: string;
}