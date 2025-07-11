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

consultaAdmin() {
  this.router.navigate(['admin/consulta']);
}
reportesAdmin() {
  this.router.navigate(['admin/reportes']);
}
}
