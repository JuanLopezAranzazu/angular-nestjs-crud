import { Routes } from '@angular/router';
// componentes
import { LayoutComponent } from './components/layout/layout.component';
// paginas
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MissingComponent } from './pages/missing/missing.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NotesComponent } from './pages/notes/notes.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
// guards
import { authGuard } from './guards/auth.guard';
import { rolesGuard } from './guards/roles.guard';
// types
import { Role } from './types/role.type';

// rutas
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: NotesComponent, canActivate: [authGuard] },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [authGuard, rolesGuard],
        data: { roles: [Role.ADMIN] },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuard],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: MissingComponent },
];
