// admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service'; 
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const isAuthenticated: boolean = this.authService.isAuthenticated();
    const isAdmin: boolean = this.authService.isAdmin();  // Utiliza isAdmin()

    if (isAuthenticated && isAdmin) {
      return true;
    } else {
      // Redirigir al usuario a una página no autorizada o a la página de inicio de sesión
      return this.router.parseUrl('/unauthorized');
    }
  }
}
