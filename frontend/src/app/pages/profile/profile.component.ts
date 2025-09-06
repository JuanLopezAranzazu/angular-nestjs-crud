import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserResponseDto } from '../../types/user.type';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, LoadingSpinnerComponent, CardModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: UserResponseDto | null = null;
  loading = true;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.profile();
  }

  profile() {
    this.loading = true;
    this.errorMessage = '';

    this.authService.profile().subscribe({
      next: (res) => {
        console.log(res);
        this.user = res;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Error al cargar el usuario';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
