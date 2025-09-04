import { Role } from './role.type';

export interface UserRequestDto {
  name: string;
  email: string;
  password: string;
}

export interface UserResponseDto {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
