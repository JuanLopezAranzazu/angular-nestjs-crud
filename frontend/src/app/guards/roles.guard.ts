import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { Role } from '../types/role.type';

export const rolesGuard: CanActivateFn = (route, _state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const expectedRoles = route.data['roles'] as Role[];
  const userRole = tokenService.getUserRole();

  if (userRole && expectedRoles.includes(userRole)) {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};
