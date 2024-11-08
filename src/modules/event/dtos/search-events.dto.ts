import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchEventsDto {
  @ApiProperty({ example: 1, description: 'Sayfa numarası', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ example: 20, description: 'Sayfa başına kayıt sayısı', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  pageSize?: number = 20;

  @ApiProperty({ example: 'Rock', description: 'Etkinlik adında arama', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'İstanbul', description: 'Şehir filtresi', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ example: '2024-03-15', description: 'Başlangıç tarihi', required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date;

  @ApiProperty({ example: '2024-12-31', description: 'Bitiş tarihi', required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;
}