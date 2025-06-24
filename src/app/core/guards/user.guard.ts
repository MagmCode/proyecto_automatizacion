// user.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const isAuthenticated: boolean = this.authService.isAuthenticated();
    const isAdmin: boolean = this.authService.isAdmin();

    if (isAuthenticated && !isAdmin) {  // Asegura que no es administrador
      return true;
    } else {
      return this.router.parseUrl('/unauthorized');
    }
  }
}
