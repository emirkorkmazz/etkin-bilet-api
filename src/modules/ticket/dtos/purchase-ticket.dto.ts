import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class PurchaseTicketDto {
  @ApiProperty({ example: 'uuid', description: 'Etkinlik ID' })
  @IsNotEmpty()
  @IsUUID()
  eventId: string;

  @ApiProperty({ example: 2, description: 'Satın alınacak bilet sayısı' })
  @IsNumber()
  @Min(1)
  quantity: number;
}