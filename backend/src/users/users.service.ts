import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRequestDto } from './dto/user-request.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => this.mapUserToResponse(user));
  }

  async getUserById(id: number): Promise<UserResponseDto | null> {
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
      data,
    });
    return this.mapUserToResponse(user);
  }

  async updateUser(
    id: number,
    data: UserRequestDto,
  ): Promise<UserResponseDto | null> {
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

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    return this.mapUserToResponse(updatedUser);
  }

  async deleteUser(id: number): Promise<UserResponseDto | null> {
    // verificar si el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user)
      throw new NotFoundException(`El usuario con id ${id} no fue encontrado`);

    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });
    return this.mapUserToResponse(deletedUser);
  }

  async findUserByEmail(email: string): Promise<UserResponseDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user)
      throw new NotFoundException(
        `El usuario con email ${email} no fue encontrado`,
      );
    return this.mapUserToResponse(user);
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
