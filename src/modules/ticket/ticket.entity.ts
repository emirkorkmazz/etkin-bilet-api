import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@auth/user.entity';
import { Event } from '@event/event.entity';

@Entity('tickets')
export class Ticket {
  @ApiProperty({ description: 'Unique ticket identifier (UUID)' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Event, event => event.id)
  event: Event;

  @ManyToOne(() => User, user => user.id)
  user: User;

  @ApiProperty({ example: 2, description: 'Satın alınan bilet sayısı' })
  @Column()
  quantity: number;

  @ApiProperty({ example: 500.00, description: 'Toplam ödenen tutar' })
  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @CreateDateColumn()
  purchaseDate: Date;

  @ApiProperty({ example: true, description: 'Bilet aktif mi?' })
  @Column({ default: true })
  isActive: boolean;
}