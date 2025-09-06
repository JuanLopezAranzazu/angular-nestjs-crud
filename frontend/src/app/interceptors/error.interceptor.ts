import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);

  return next(req).pipe(
    catchError((error) => {
      // verificar si hubo un error en la peticion
      if (error.status === 401) {
        tokenService.logout();
      }

      return throwError(() => error);
    })
  );
};
