import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@auth/user.entity';

@Entity('events')
export class Event {
  @ApiProperty({ description: 'Unique event identifier (UUID)' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Rock Konseri', description: 'Etkinlik adı' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Harika bir rock konseri', description: 'Etkinlik açıklaması' })
  @Column('text')
  description: string;

  @ApiProperty({ example: '2024-03-15T20:00:00Z', description: 'Etkinlik başlangıç tarihi' })
  @Column('timestamp')
  date: Date;

  @ApiProperty({ example: 'İstanbul', description: 'Etkinlik şehri' })
  @Column()
  city: string;

  @ApiProperty({ example: 'Kadıköy', description: 'Etkinlik ilçesi' })
  @Column()
  district: string;

  @ApiProperty({ example: 'Konser alanı tam adresi', description: 'Etkinlik tam adresi' })
  @Column('text')
  address: string;

  @ApiProperty({ example: 100, description: 'Toplam bilet sayısı' })
  @Column()
  totalTickets: number;

  @ApiProperty({ example: 50, description: 'Kalan bilet sayısı' })
  @Column()
  availableTickets: number;

  @ApiProperty({ example: 250.00, description: 'Bilet fiyatı' })
  @Column('decimal', { precision: 10, scale: 2 })
  ticketPrice: number;

  @ApiProperty({ example: true, description: 'Etkinlik aktif mi?' })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Etkinlik resmi' })
  @Column()
  image: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'organizerId' })
  organizer: User;

  @Column({ nullable: true }) // nullable: true yerine false yapıyoruz
  organizerId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}