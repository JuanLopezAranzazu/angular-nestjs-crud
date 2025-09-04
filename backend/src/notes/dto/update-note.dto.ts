import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'El título debe tener al menos 2 caracteres' })
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'El contenido debe tener al menos 5 caracteres' })
  content?: string;
}
