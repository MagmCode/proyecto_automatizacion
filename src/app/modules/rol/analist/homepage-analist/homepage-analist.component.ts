import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-homepage-analist',
  templateUrl: './homepage-analist.component.html',
  styleUrls: ['./homepage-analist.component.scss']
})
export class HomepageAnalistComponent implements OnInit {
  Nombre: string = '';
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    // Subscribe to currentUser to display the logged-in user's name
    this.authService.currentUser.subscribe(user => {
      if (user && (user.firstName || user.lastName)) {
        this.Nombre = `${user.firstName || ''} ${user.lastName || ''}`.trim();
      } else {
        // Fallback to localStorage values if BehaviorSubject is empty
        const first = localStorage.getItem('first_name') || '';
        const last = localStorage.getItem('last_name') || '';
        const username = localStorage.getItem('username') || '';
        this.Nombre = (first || last) ? `${first} ${last}`.trim() : username;
      }
    });
  }

  adminCartaAval() {
    this.router.navigate(["admin/carta-aval"]);
  }
  adminReembolso() {
    this.router.navigate(["admin/reembolso"]);
  }
  historial() {
    this.router.navigate(["admin/historial"]);
  }
  reportes() {
    this.router.navigate(["admin/reportes"]);
  }

  reembolsoAnalist(): void {
    this.router.navigate(['analist/reembolso']);
  }
  cartaAvalAnalist(): void {
    this.router.navigate(['analist/carta-aval']);
  }
  consultaAnalist(): void {
    this.router.navigate(['analist/consulta']);
  }
}
