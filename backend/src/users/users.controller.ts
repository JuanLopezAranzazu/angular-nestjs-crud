import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRequestDto } from './dto/user-request.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<UserResponseDto[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto | null> {
    return this.usersService.getUserById(id);
  }

  @Post()
  async createUser(@Body() data: UserRequestDto): Promise<UserResponseDto> {
    return this.usersService.createUser(data);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserRequestDto,
  ): Promise<UserResponseDto | null> {
    return this.usersService.updateUser(id, data);
  }

  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto | null> {
    return this.usersService.deleteUser(id);
  }
}
