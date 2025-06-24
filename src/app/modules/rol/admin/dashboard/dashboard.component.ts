import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
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
}
