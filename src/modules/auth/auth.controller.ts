import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { RegisterDto } from '@auth/dtos/register.dto';
import { LoginDto } from '@auth/dtos/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResponse, LoginResponse } from '@auth/interfaces/auth-response.interface';

@ApiTags('Auth')
@Controller('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('Register')
  @ApiOperation({ summary: 'Yeni kullanıcı kaydı' })
  @ApiResponse({ 
    status: 201, 
    description: 'Kullanıcı başarıyla oluşturuldu',
    type: AuthResponse 
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('Login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Kullanıcı girişi' })
  @ApiResponse({ 
    status: 200, 
    description: 'Başarıyla giriş yapıldı',
    type: LoginResponse
  })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.username, 
      loginDto.password
    );
    return this.authService.login(user);
  }
}