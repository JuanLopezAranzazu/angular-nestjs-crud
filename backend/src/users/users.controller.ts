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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRequestDto } from './dto/user-request.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getUsers(): Promise<UserResponseDto[]> {
    return this.usersService.getUsers();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    return this.usersService.getUserById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createUser(@Body() data: UserRequestDto): Promise<UserResponseDto> {
    return this.usersService.createUser(data);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserRequestDto,
  ): Promise<UserResponseDto> {
    return this.usersService.updateUser(id, data);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.usersService.deleteUser(id);
  }
}
