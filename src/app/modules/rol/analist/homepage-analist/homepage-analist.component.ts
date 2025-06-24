import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-homepage-analist',
  templateUrl: './homepage-analist.component.html',
  styleUrls: ['./homepage-analist.component.scss']
})
export class HomepageAnalistComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

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
}
