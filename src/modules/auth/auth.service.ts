import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@auth/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from '@auth/dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUsername = await this.userRepository.findOne({ 
      where: { username: registerDto.username } 
    });
    
    if (existingUsername) {
      throw new ConflictException('Bu kullanıcı adı zaten kullanılıyor');
    }

    if (registerDto.email) {
      const existingEmail = await this.userRepository.findOne({ 
        where: { email: registerDto.email } 
      });
      
      if (existingEmail) {
        throw new ConflictException('Bu email adresi zaten kullanılıyor');
      }
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    const user = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
    });

    await this.userRepository.save(user);
    
    return { 
      message: 'Kullanıcı başarıyla oluşturuldu'
    };
  }

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    
    if (!user) {
      throw new UnauthorizedException('Geçersiz kullanıcı adı veya şifre');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Geçersiz kullanıcı adı veya şifre');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    const { password, ...userInfo } = await this.userRepository.findOne({ 
      where: { id: user.id } 
    });

    return {
      message: 'Başarıyla giriş yapıldı',
      data: {
        user: userInfo,
        access_token
      }
    };
  }
}