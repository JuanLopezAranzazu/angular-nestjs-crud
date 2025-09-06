import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
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
    { label: 'Notas', route: '/' },
    { label: 'Usuarios', route: '/admin', roles: [Role.ADMIN] },
  ];
  userMenuItems: MenuItem[] = [
    {
      label: 'Perfil del usuario',
      icon: 'pi pi-user',
      command: () => this.router.navigate(['/profile']),
    },
    { separator: true },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => this.logout(),
    },
  ];

  constructor(
    private readonly tokenService: TokenService,
    private router: Router
  ) {}

  // filtrar menu de navegacion
  get filteredNavItems(): NavItem[] {
    const role = this.tokenService.getUserRole();
    return this.navItems.filter(
      (item) => !item.roles || (role && item.roles.includes(role))
    );
  }

  // cerrar sesion
  logout() {
    this.tokenService.logout();
  }
}
