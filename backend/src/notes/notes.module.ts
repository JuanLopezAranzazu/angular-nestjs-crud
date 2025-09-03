import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [NotesService, JwtService],
  controllers: [NotesController],
})
export class NotesModule {}
