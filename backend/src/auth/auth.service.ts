import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthRequestDto } from './dto/auth-request.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authRequestDto: AuthRequestDto): Promise<AuthResponseDto> {
    const { email, password } = authRequestDto;

    // verificar que el usuario existe y la contraseña es correcta
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValid = await argon.verify(user.password, password);
    if (!passwordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // generar el token JWT
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
