import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Toolbar } from 'primeng/toolbar';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { TokenService } from '../../services/token.service';
import { Role } from '../../types/role.type';

interface NavItem {
  label: string;
  route: string;
  roles?: Role[];
}

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterModule,
    Toolbar,
    SharedModule,
    ButtonModule,
    MenuModule,
    CommonModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  navItems: NavItem[] = [
    { label: 'Inicio', route: '/' },
    { label: 'Notas', route: '/notes' },
    { label: 'Usuarios', route: '/admin', roles: [Role.ADMIN] },
  ];

  userMenuItems: MenuItem[] = [
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => this.logout(),
    },
  ];

  constructor(private readonly tokenService: TokenService) {}

  // filtrar menu de navegacion
  get filteredNavItems(): NavItem[] {
    const role = this.tokenService.getUserRole();
    return this.navItems.filter(
      (item) => !item.roles || (role && item.roles.includes(role))
    );
  }

  logout() {
    this.tokenService.logout();
  }
}
