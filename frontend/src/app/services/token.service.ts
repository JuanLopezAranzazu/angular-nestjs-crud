import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../types/jwtPayload.type';
import { Role } from '../types/role.type';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth';

  constructor(private router: Router) {}

  // guardar el token
  login(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // eliminar el token
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  // obtener el token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // verificar si el token el valido
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decoded: JwtPayload = jwtDecode(token);
    return Date.now() < decoded.exp * 1000;
  }

  // obtener el rol del usuario
  getUserRole(): Role | null {
    const token = this.getToken();
    if (!token) return null;

    const decoded: JwtPayload = jwtDecode(token);
    return decoded.role;
  }

  // obtener el correo del usuario
  getUserEmail(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const decoded: JwtPayload = jwtDecode(token);
    return decoded.email;
  }
}
