import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth-request.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UsersService } from 'src/users/users.service';
import { UserRequestDto } from 'src/users/dto/user-request.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { Public } from '../common/decorators/public/public.decorator';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id/get-current-user-id.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async login(
    @Body() authRequestDto: AuthRequestDto,
  ): Promise<AuthResponseDto> {
    return this.authService.login(authRequestDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  async register(@Body() data: UserRequestDto): Promise<UserResponseDto> {
    return this.usersService.createUser(data);
  }

  @HttpCode(HttpStatus.OK)
  @Get('profile')
  async getProfile(
    @GetCurrentUserId() userId: number,
  ): Promise<UserResponseDto> {
    return this.usersService.getUserById(userId);
  }
}
