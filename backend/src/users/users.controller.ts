import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRequestDto } from './dto/user-request.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { RolesGuard } from '../common/guards/roles/roles.guard';
import { Roles } from '../common/decorators/roles/roles.decorator';
import { Role } from '@prisma/client';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id/get-current-user-id.decorator';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  @Get()
  async getUsers(): Promise<UserResponseDto[]> {
    return this.usersService.getUsers();
  }

  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    return this.usersService.getUserById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.ADMIN)
  @Post()
  async createUser(@Body() data: UserRequestDto): Promise<UserResponseDto> {
    return this.usersService.createUser(data);
  }

  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  @Put(':id')
  async updateUser(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.updateUser(id, data, userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteUser(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.usersService.deleteUser(id, userId);
  }
}
