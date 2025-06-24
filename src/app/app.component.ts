import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'automatizacion-de-reembolsos';
  private previousUrl: string = '';
  private currentUrl: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Guardar la ruta actual antes de la navegación
        this.previousUrl = this.currentUrl;
      }

      if (event instanceof NavigationEnd) {
        // Actualizar la ruta actual después de la navegación
        this.currentUrl = event.url;

        // Verificar si el usuario está logueado y accede manualmente a /login
        if (this.authService.isLoggedIn() && this.currentUrl === '/Login') {
          this.authService.logout(); // Destruye la sesión
          this.router.navigate(['/Login']); // Redirige al login
        }

        // Verificar si el usuario está navegando hacia atrás y la ruta anterior es /login
        if (event instanceof PopStateEvent && this.previousUrl === '/Login') {
          this.authService.logout(); // Destruye la sesión
        }
      }
    });
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    // Verificar si la ruta anterior es /login
    if (this.previousUrl === '/Login') {
      this.authService.logout(); // Asegura destruir la sesión al navegar hacia atrás
    }
  }
}