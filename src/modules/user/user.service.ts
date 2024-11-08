import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@auth/user.entity';
import { UpdateUserDto } from '@user/dtos/update-user.dto';
import { ChangePasswordDto } from '@user/dtos/change-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getProfile(userId: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return {
          status: false,
          message: 'Kullanıcı bulunamadı'
        };
      }

      const { password, ...userInfo } = user;
      return {
        status: true,
        message: 'Profil bilgileri başarıyla getirildi',
        user: userInfo
      };
    } catch (error) {
      return {
        status: false,
        message: 'Profil bilgileri getirilirken bir hata oluştu'
      };
    }
  }

  async updateProfile(userId: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return {
          status: false,
          message: 'Kullanıcı bulunamadı'
        };
      }

      // Email değişikliği varsa, email kontrolü yap
      if (updateUserDto.email && updateUserDto.email !== user.email) {
        const existingEmail = await this.userRepository.findOne({
          where: { email: updateUserDto.email }
        });
        if (existingEmail) {
          return {
            status: false,
            message: 'Bu email adresi zaten kullanılıyor'
          };
        }
      }

      await this.userRepository.update(userId, updateUserDto);

      return {
        status: true,
        message: 'Profil bilgileri başarıyla güncellendi'
      };
    } catch (error) {
      return {
        status: false,
        message: 'Profil güncellenirken bir hata oluştu'
      };
    }
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return {
          status: false,
          message: 'Kullanıcı bulunamadı'
        };
      }

      // Mevcut şifreyi kontrol et
      const isPasswordValid = await bcrypt.compare(
        changePasswordDto.currentPassword,
        user.password
      );

      if (!isPasswordValid) {
        return {
          status: false,
          message: 'Mevcut şifre yanlış'
        };
      }

      // Yeni şifreyi hashle
      const hashedNewPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
      
      await this.userRepository.update(userId, { password: hashedNewPassword });

      return {
        status: true,
        message: 'Şifre başarıyla değiştirildi'
      };
    } catch (error) {
      return {
        status: false,
        message: 'Şifre değiştirilirken bir hata oluştu'
      };
    }
  }
}