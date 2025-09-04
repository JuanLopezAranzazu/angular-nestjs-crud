import { Routes } from '@angular/router';

// paginas
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MissingComponent } from './pages/missing/missing.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

// guards
import { authGuard } from './guards/auth.guard';
import { rolesGuard } from './guards/roles.guard';

import { Role } from './types/role.type';

// rutas
export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard, rolesGuard],
    data: { roles: [Role.ADMIN] },
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: MissingComponent },
];
