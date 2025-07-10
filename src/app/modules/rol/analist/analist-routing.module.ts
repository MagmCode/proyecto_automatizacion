import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageAnalistComponent } from './homepage-analist/homepage-analist.component';
import { ReembolsoAnalistComponent } from './reembolso-analist/reembolso-analist.component';
import { CartaavalAnalistComponent } from './cartaaval-analist/cartaaval-analist.component';
import { EdirProfileAnalistComponent } from './edir-profile-analist/edir-profile-analist.component';
import { ChangePasswordAnalistComponent } from './change-password-analist/change-password-analist.component';
import { HistorialAnalistComponent } from './historial-analist/historial-analist.component';
import { DetalleReembolsoAnalistComponent } from './detalle-reembolso-analist/detalle-reembolso-analist.component';
import { DetalleCartaavalAnalistComponent } from './detalle-cartaaval-analist/detalle-cartaaval-analist.component';
import { ReportesAnalistComponent } from './reportes-analist/reportes-analist.component';
import { ConsultaAnalistComponent } from './consulta-analist/consulta-analist.component';
import { NoAuthGuard } from '../../../core/guards/no-auth.guard';

const routes: Routes = [
  { path: 'home-page', component: HomepageAnalistComponent, canActivate: [NoAuthGuard] },
  { path: 'reembolso', component: ReembolsoAnalistComponent, canActivate: [NoAuthGuard] },
  { path: 'carta-aval', component: CartaavalAnalistComponent, canActivate: [NoAuthGuard] },
  { path: 'editar-perfil', component: EdirProfileAnalistComponent, canActivate: [NoAuthGuard] },
  { path: 'cambiar-password', component: ChangePasswordAnalistComponent, canActivate: [NoAuthGuard] },
  { path: 'historial', component: HistorialAnalistComponent, canActivate: [NoAuthGuard] },
  { path: 'reportes', component: ReportesAnalistComponent, canActivate: [NoAuthGuard] },
  { path: 'reembolso/detalle/:id', component: DetalleReembolsoAnalistComponent, canActivate: [NoAuthGuard] },
  { path: 'carta-aval/detalle/:id', component: DetalleCartaavalAnalistComponent, canActivate: [NoAuthGuard] },
  { path: 'consulta', component: ConsultaAnalistComponent, canActivate: [NoAuthGuard] },
  { path: '', redirectTo: 'home-page', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalistRoutingModule { }
