import { IsNotEmpty, MinLength } from 'class-validator';

export class NoteRequestDto {
  @IsNotEmpty({ message: 'El título es requerido' })
  @MinLength(2, { message: 'El título debe tener al menos 2 caracteres' })
  title: string;

  @IsNotEmpty({ message: 'El contenido es requerido' })
  @MinLength(5, { message: 'El contenido debe tener al menos 5 caracteres' })
  content: string;
}
