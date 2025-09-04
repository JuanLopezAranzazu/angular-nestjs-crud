import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NoteRequestDto } from './dto/note-request.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NoteResponseDto } from './dto/note-response.dto';
import { Note } from '@prisma/client';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async getNotesByUser(userId: number): Promise<NoteResponseDto[]> {
    const notes = await this.prisma.note.findMany({
      where: { userId },
    });
    return notes.map((note: Note) => this.mapToResponseDto(note));
  }

  async createNote(
    data: NoteRequestDto,
    userId: number,
  ): Promise<NoteResponseDto> {
    const note = await this.prisma.note.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      },
    });
    return this.mapToResponseDto(note);
  }

  async getNoteById(id: number, userId: number): Promise<NoteResponseDto> {
    // verificar si la nota existe
    const note = await this.prisma.note.findUnique({
      where: { id },
    });
    if (!note) {
      throw new NotFoundException(`La nota con id ${id} no fue encontrada`);
    }

    // verificar que el usuario es el propietario de la nota
    if (note.userId !== userId) {
      throw new ForbiddenException(
        `No tienes permiso para acceder a esta nota`,
      );
    }

    return this.mapToResponseDto(note);
  }

  async updateNote(
    id: number,
    data: UpdateNoteDto,
    userId: number,
  ): Promise<NoteResponseDto> {
    // verificar que la nota existe
    const note = await this.prisma.note.findUnique({
      where: { id },
    });
    if (!note) {
      throw new NotFoundException(`La nota con id ${id} no fue encontrada`);
    }

    // verificar que el usuario es el propietario de la nota
    if (note.userId !== userId) {
      throw new ForbiddenException(
        `No tienes permiso para actualizar esta nota`,
      );
    }

    // actualizar la nota
    const updatedNote = await this.prisma.note.update({
      where: { id },
      data,
    });
    return this.mapToResponseDto(updatedNote);
  }

  async deleteNote(id: number, userId: number): Promise<void> {
    // verificar que la nota existe
    const note = await this.prisma.note.findUnique({
      where: { id },
    });
    if (!note) {
      throw new NotFoundException(`La nota con id ${id} no fue encontrada`);
    }

    // verificar que el usuario es el propietario de la nota
    if (note.userId !== userId) {
      throw new ForbiddenException(`No tienes permiso para eliminar esta nota`);
    }

    // eliminar la nota
    await this.prisma.note.delete({
      where: { id },
    });
  }

  private mapToResponseDto(note: Note): NoteResponseDto {
    return {
      id: note.id,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    };
  }
}
