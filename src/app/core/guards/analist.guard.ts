import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnalistGuard implements CanActivate {


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // const isAuthenticated: boolean = this.authService.isAuthenticated();
    const isAdmin: boolean = this.authService.isAdmin();
    if ( !isAdmin) {
      return true;
    } else {
      return this.router.parseUrl('/unauthorized');
    }
  }

    
  
}
