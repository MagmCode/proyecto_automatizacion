import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean = false;
  isAnalist: boolean = false;
  name: string = '';
  sidenavOpen: boolean = false;
  menuOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const role = this.authService.getUserRole();
    this.isAdmin = role === 'admin';
    this.isAnalist = role === 'analista';
    this.authService.getUserProfile().subscribe ({
      next: (profile) => {
        this.name = profile.first_name;
      }
    })
  }

  // Métodos de navegación para usuarios (cliente)
  editProfile(): void {
    this.router.navigate(['user/editar-perfil']);
  }
  changePassword(): void {
    this.router.navigate(['user/cambiar-password']);
  }
  home(): void {
    if (this.sidenavOpen) {
      this.sidenavOpen = false;
    }
    this.router.navigate(['analist/home-page']);
  }
  reembolso(): void {
    this.router.navigate(['user/reembolso']);
  }
  cartaAval(): void {
    this.router.navigate(['user/carta-aval']);
  }

  // Métodos para analist
  homeAnalist(): void {
    if (this.sidenavOpen) {
      this.sidenavOpen = false;
    }
    this.router.navigate(['analist/home-page']);
  }
  historialAnalist(): void {
    this.router.navigate(['analist/historial']);
  }
  reportesAnalist(): void {
    this.router.navigate(['analist/reportes']);
  }
  reembolsoAnalist(): void {
    console.log('Navegando a analist/reembolso');
    this.router.navigate(['analist/reembolso']);
  }
  cartaAvalAnalist(): void {
    console.log('Navegando a analist/carta-aval');
    this.router.navigate(['analist/carta-aval']);
  }
  assignProfileAnalist(): void {
    this.router.navigate(['analist/asignar-perfil']);
  }
  editAdminProfileAnalist(): void {
    this.router.navigate(['analist/editar-perfil']);
  }
  changePasswordAdminAnalist(): void {
    this.router.navigate(['analist/cambiar-password']);
  }
  consultaAnalist(): void {
    this.router.navigate(['analist/consulta']);
  }

  // Métodos para admin
  assignProfile(): void {
    this.router.navigate(['admin/asignar-perfil']);
  }
  dashboard(): void {
    if (this.sidenavOpen) {
      this.sidenavOpen = false;
    }
    this.router.navigate(['admin/dashboard']);
  }
    consultaAdmin(): void {
    this.router.navigate(['admin/consulta']);
  }
  reportesAdmin(): void {
    this.router.navigate(['admin/reportes']);
  }

  editAdminProfile(): void {
    this.router.navigate(['admin/editar-perfil']);
  }
  changePasswordAdmin(): void {
    this.router.navigate(['admin/cambiar-password']);
  }


  // Métodos para el Sidenav y menú
  toggleSidenav(): void {
    this.sidenavOpen = !this.sidenavOpen;
  }
  
  closeSidenav(isOpened: boolean): void {
    this.sidenavOpen = isOpened;
  }
  
  showMenu(): void {
    this.menuOpen = true;
  }
  hideMenu(): void {
    this.menuOpen = false;
  }

  logout(): void {
    this.authService.logout().subscribe({
    next: () => {
      this.router.navigate(['/auth/login']);
    },
    error: (err) => {
      console.error('Error:', err);
      this.router.navigate(['/auth/login']); // Redirigir igual
    }
  });
  }
}