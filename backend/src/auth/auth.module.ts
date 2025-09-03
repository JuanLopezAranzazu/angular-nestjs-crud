import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Module({
  providers: [AuthService, UsersService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
