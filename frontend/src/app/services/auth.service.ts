import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthRequestDto, AuthResponseDto } from '../types/auth.type';
import { UserRequestDto, UserResponseDto } from '../types/user.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  constructor() {}

  // inicia de sesion de usuarios
  login(credentials: AuthRequestDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/login`, credentials);
  }

  // registro de usuarios
  register(user: UserRequestDto): Observable<UserResponseDto> {
    return this.http.post<UserResponseDto>(`${this.apiUrl}/register`, user);
  }
}
