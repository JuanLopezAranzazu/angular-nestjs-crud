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

  constructor() {}

  // inicia de sesion de usuarios
  login(credentials: AuthRequestDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(
      `${environment.apiUrl}/auth/login`,
      credentials
    );
  }

  // registro de usuarios
  register(data: UserRequestDto): Observable<UserResponseDto> {
    return this.http.post<UserResponseDto>(
      `${environment.apiUrl}/auth/register`,
      data
    );
  }
}
