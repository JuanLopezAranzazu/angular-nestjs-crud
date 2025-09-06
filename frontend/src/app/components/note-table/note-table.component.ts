import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NoteResponseDto } from '../../types/note.type';

@Component({
  selector: 'app-note-table',
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './note-table.component.html',
  styleUrl: './note-table.component.css',
})
export class NoteTableComponent {
  @Input() notes: NoteResponseDto[] = [];
  @Output() edit = new EventEmitter<NoteResponseDto>();
  @Output() delete = new EventEmitter<number>();

  onEdit(note: NoteResponseDto) {
    this.edit.emit(note);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }
}
