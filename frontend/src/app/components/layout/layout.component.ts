import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Toolbar } from 'primeng/toolbar';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterModule,
    Toolbar,
    SharedModule,
    ButtonModule,
    MenuModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  constructor(private readonly tokenService: TokenService) {}

  userMenuItems: MenuItem[] = [
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => this.logout(),
    },
  ];

  logout() {
    this.tokenService.logout();
  }
}
