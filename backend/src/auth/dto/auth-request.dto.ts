import { IsNotEmpty } from 'class-validator';

export class AuthRequestDto {
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;
}
