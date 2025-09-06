import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NoteRequestDto, NoteResponseDto } from '../types/note.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/notes`;

  constructor() {}

  // obtener todas las notas del usuario autenticado
  getNotes(): Observable<NoteResponseDto[]> {
    return this.http.get<NoteResponseDto[]>(this.apiUrl);
  }

  // obtener una nota por id
  getNoteById(id: number): Observable<NoteResponseDto> {
    return this.http.get<NoteResponseDto>(`${this.apiUrl}/${id}`);
  }

  // crear una nueva nota
  createNote(note: NoteRequestDto): Observable<NoteResponseDto> {
    return this.http.post<NoteResponseDto>(this.apiUrl, note);
  }

  // actualizar una nota
  updateNote(id: number, note: NoteRequestDto): Observable<NoteResponseDto> {
    return this.http.put<NoteResponseDto>(`${this.apiUrl}/${id}`, note);
  }

  // eliminar una nota
  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
