import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { RegisterDto } from '@auth/dtos/register.dto';
import { LoginDto } from '@auth/dtos/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResponse, LoginResponse } from '@auth/interfaces/auth-response.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Yeni kullanıcı kaydı' })
  @ApiResponse({ 
    status: 201, 
    description: 'Kullanıcı başarıyla oluşturuldu',
    type: AuthResponse 
  })
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: 'Kullanıcı girişi' })
  @ApiResponse({ 
    status: 200, 
    description: 'Başarıyla giriş yapıldı',
    type: LoginResponse
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      return {
        status: false,
        message: 'Geçersiz kullanıcı adı veya şifre'
      };
    }
    return this.authService.login(user);
  }
}