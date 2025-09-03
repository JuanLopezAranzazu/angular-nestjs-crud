import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
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

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get()
  async getNotes(@Request() req): Promise<NoteResponseDto[]> {
    return this.notesService.getNotesByUser(req.user.sub);
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @Post()
  async createNote(
    @Request() req,
    @Body() data: NoteRequestDto,
  ): Promise<NoteResponseDto> {
    return this.notesService.createNote(data, req.user.sub);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get(':id')
  async getNoteById(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<NoteResponseDto> {
    return this.notesService.getNoteById(id, req.user.sub);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateNote(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: NoteRequestDto,
  ): Promise<NoteResponseDto> {
    return this.notesService.updateNote(id, data, req.user.sub);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteNote(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.notesService.deleteNote(id, req.user.sub);
  }
}
