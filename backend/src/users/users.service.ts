import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRequestDto } from './dto/user-request.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from '@prisma/client';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user: User) => this.mapUserToResponse(user));
  }

  async getUserById(id: number): Promise<UserResponseDto> {
    // verificar si el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user)
      throw new NotFoundException(`El usuario con id ${id} no fue encontrado`);

    return this.mapUserToResponse(user);
  }

  async createUser(data: UserRequestDto): Promise<UserResponseDto> {
    // verificar si el email ya está en uso
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new BadRequestException('El email ya está en uso');
    }

    // crear un nuevo usuario
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: await argon.hash(data.password),
      },
    });
    return this.mapUserToResponse(user);
  }

  async updateUser(id: number, data: UserRequestDto): Promise<UserResponseDto> {
    // verificar si el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user)
      throw new NotFoundException(`El usuario con id ${id} no fue encontrado`);

    // validar si el email ya está en uso
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser && existingUser.id !== id) {
      throw new BadRequestException('El email ya está en uso');
    }

    // actualizar el usuario
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        password: await argon.hash(data.password),
      },
    });

    return this.mapUserToResponse(updatedUser);
  }

  async deleteUser(id: number): Promise<void> {
    // verificar si el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user)
      throw new NotFoundException(`El usuario con id ${id} no fue encontrado`);

    // eliminar el usuario
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  mapUserToResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
