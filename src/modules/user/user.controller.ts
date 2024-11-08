import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { JwtAuthGuard } from '@user/jwt.auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateUserDto } from '@user/dtos/update-user.dto';
import { ChangePasswordDto } from '@user/dtos/change-password.dto';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Kullanıcı profilini getir' })
  @ApiResponse({ status: 200, description: 'Kullanıcı profili başarıyla getirildi' })
  async getProfile(@Request() req) {
    return this.userService.getProfile(req.user.userId);
  }

  @Put('update')
  @ApiOperation({ summary: 'Kullanıcı bilgilerini güncelle' })
  @ApiResponse({ status: 200, description: 'Kullanıcı bilgileri başarıyla güncellendi' })
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateProfile(req.user.userId, updateUserDto);
  }

  @Put('change-password')
  @ApiOperation({ summary: 'Kullanıcı şifresini değiştir' })
  @ApiResponse({ status: 200, description: 'Şifre başarıyla değiştirildi' })
  async changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
    return this.userService.changePassword(req.user.userId, changePasswordDto);
  }
}