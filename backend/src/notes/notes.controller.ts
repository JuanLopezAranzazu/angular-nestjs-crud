import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Put,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { NoteRequestDto } from './dto/note-request.dto';
import { NoteResponseDto } from './dto/note-response.dto';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id/get-current-user-id.decorator';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get()
  async getNotes(
    @GetCurrentUserId() userId: number,
  ): Promise<NoteResponseDto[]> {
    return this.notesService.getNotesByUser(userId);
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @Post()
  async createNote(
    @GetCurrentUserId() userId: number,
    @Body() data: NoteRequestDto,
  ): Promise<NoteResponseDto> {
    return this.notesService.createNote(data, userId);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get(':id')
  async getNoteById(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<NoteResponseDto> {
    return this.notesService.getNoteById(id, userId);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateNote(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: NoteRequestDto,
  ): Promise<NoteResponseDto> {
    return this.notesService.updateNote(id, data, userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteNote(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.notesService.deleteNote(id, userId);
  }
}
