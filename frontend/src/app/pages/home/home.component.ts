import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-home',
  imports: [ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userEmail: string | null = null;

  constructor(private readonly tokenService: TokenService) {
    this.userEmail = this.tokenService.getUserEmail();
  }

  logout() {
    this.tokenService.logout();
  }
}
