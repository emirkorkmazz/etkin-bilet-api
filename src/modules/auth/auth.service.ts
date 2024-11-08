import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@auth/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from '@auth/dtos/register.dto';
import { AuthResponse, LoginResponse } from '@auth/interfaces/auth-response.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    try {
      // Check if username exists
      const existingUsername = await this.userRepository.findOne({ 
        where: { username: registerDto.username } 
      });
      
      if (existingUsername) {
        return {
          status: false,
          message: 'Bu kullanıcı adı zaten kullanılıyor'
        };
      }

      // Check if email exists (if provided)
      if (registerDto.email) {
        const existingEmail = await this.userRepository.findOne({ 
          where: { email: registerDto.email } 
        });
        
        if (existingEmail) {
          return {
            status: false,
            message: 'Bu email adresi zaten kullanılıyor'
          };
        }
      }

      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      
      const user = this.userRepository.create({
        ...registerDto,
        password: hashedPassword,
      });

      await this.userRepository.save(user);
      
      return { 
        status: true,
        message: 'Kullanıcı başarıyla oluşturuldu'
      };
    } catch (error) {
      return {
        status: false,
        message: 'Kullanıcı oluşturulurken bir hata oluştu'
      };
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { username } });
      if (!user) {
        return null;
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return null;
      }
      const { password: _, ...result } = user;
      return result;
    } catch (error) {
      return null;
    }
  }

  async login(user: any): Promise<LoginResponse> {
    try {
      const payload = { username: user.username, sub: user.id };
      const access_token = this.jwtService.sign(payload);

      const { password, ...userInfo } = await this.userRepository.findOne({ 
        where: { id: user.id } 
      });

      return {
        status: true,
        message: 'Başarıyla giriş yapıldı',
        user: userInfo,
        access_token
      };
    } catch (error) {
      return {
        status: false,
        message: 'Giriş yapılırken bir hata oluştu'
      };
    }
  }
}