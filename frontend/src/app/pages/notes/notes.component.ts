import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesService } from '../../services/notes.service';
import { NoteRequestDto, NoteResponseDto } from '../../types/note.type';
import { NoteTableComponent } from '../../components/note-table/note-table.component';
import { NoteFormComponent } from '../../components/note-form/note-form.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-notes',
  imports: [
    CommonModule,
    NoteTableComponent,
    NoteFormComponent,
    ButtonModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent implements OnInit {
  notes: NoteResponseDto[] = [];
  selectedNote: NoteResponseDto | null = null;
  showModal = false;
  loading = false;
  loadingForm = false;
  errorMessage = '';

  constructor(private readonly notesService: NotesService) {}

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.loading = true;
    this.errorMessage = '';

    this.notesService.getNotes().subscribe({
      next: (res) => {
        console.log(res);
        this.notes = res;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Error al cargar las notas';
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  onSave(note: NoteRequestDto) {
    this.loadingForm = true;
    this.errorMessage = '';

    const request$ = this.selectedNote
      ? this.notesService.updateNote(this.selectedNote.id, note)
      : this.notesService.createNote(note);

    request$.subscribe({
      next: (res) => {
        console.log(res);
        this.getNotes();
        this.showModal = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Error al guardar la nota';
      },
      complete: () => {
        this.loadingForm = false;
      },
    });
  }

  onDelete(id: number) {
    this.errorMessage = '';

    this.notesService.deleteNote(id).subscribe({
      next: () => {
        this.getNotes();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Error al eliminar la nota';
      },
    });
  }

  onCreate() {
    this.selectedNote = null;
    this.showModal = true;
  }

  onEdit(note: NoteResponseDto) {
    this.selectedNote = note;
    this.showModal = true;
  }
}
