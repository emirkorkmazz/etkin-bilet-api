import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ description: 'Unique user identifier (UUID)' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'johndoe', description: 'Username' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @Column({ nullable: true })
  surname: string;

  @ApiProperty({ example: 25, description: 'User age' })
  @Column({ nullable: true })
  age: number;

  @ApiProperty({ example: '+905551234567', description: 'Phone number' })
  @Column({ nullable: true })
  phoneNumber: string;

  @Column()
  password: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email address' })
  @Column({ unique: true, nullable: true })
  email: string;

  @ApiProperty({ description: 'Email verification status' })
  @Column({ default: false })
  isMailVerified: boolean;

  @ApiProperty({ description: 'Account status' })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Account creation date' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}