import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRequestDto, UserResponseDto } from '../types/user.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/users`;

  constructor() {}

  // obtener todos los usuarios
  getUsers(): Observable<UserResponseDto[]> {
    return this.http.get<UserResponseDto[]>(this.apiUrl);
  }

  // obtener un usuario
  getUserById(id: number): Observable<UserResponseDto> {
    return this.http.get<UserResponseDto>(`${this.apiUrl}/${id}`);
  }

  // crear un nuevo usuario
  createUser(user: UserRequestDto): Observable<UserResponseDto> {
    return this.http.post<UserResponseDto>(this.apiUrl, user);
  }

  // actualizar un usuario
  updateUser(id: number, user: UserRequestDto): Observable<UserResponseDto> {
    return this.http.put<UserResponseDto>(`${this.apiUrl}/${id}`, user);
  }

  // eliminar un usuario
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
