import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({ example: true, description: 'İşlem durumu' })
  status: boolean;

  @ApiProperty({ example: 'İşlem başarılı', description: 'İşlem mesajı' })
  message: string;
}

export class LoginResponse extends AuthResponse {
  @ApiProperty({
    description: 'Kullanıcı bilgileri',
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      username: 'johndoe',
      email: 'john@example.com',
      name: 'John',
      surname: 'Doe',
      age: 25,
      phoneNumber: '+905551234567',
      isMailVerified: false,
      createdAt: '2024-02-08T10:00:00Z',
      updatedAt: '2024-02-08T10:00:00Z'
    }
  })
  user?: {
    id: string;
    username: string;
    email?: string;
    name?: string;
    surname?: string;
    age?: number;
    phoneNumber?: string;
    isMailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  };

  @ApiProperty({ 
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', 
    description: 'JWT access token' 
  })
  access_token?: string;
}