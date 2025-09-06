import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  imports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    this.loading = true;
    this.errorMessage = '';

    // validar el formulario
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor completa todos los campos.';
      return;
    }

    // hacer peticion
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        // guardar el token
        this.tokenService.login(res.accessToken);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage =
          err.error?.message || 'Credenciales inválidas. Intenta de nuevo.';
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
