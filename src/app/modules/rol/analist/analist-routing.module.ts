import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageAnalistComponent } from './homepage-analist/homepage-analist.component';
import { EdirProfileAnalistComponent } from './edir-profile-analist/edir-profile-analist.component';
import { ChangePasswordAnalistComponent } from './change-password-analist/change-password-analist.component';
import { ReportesAnalistComponent } from './reportes-analist/reportes-analist.component';
import { ConsultaAnalistComponent } from './consulta-analist/consulta-analist.component';
import { NoAuthGuard } from '../../../core/guards/no-auth.guard';

const routes: Routes = [
  { path: 'home-page', component: HomepageAnalistComponent, canActivate: [NoAuthGuard] },
  { path: 'editar-perfil', component: EdirProfileAnalistComponent, canActivate: [NoAuthGuard] },
  { path: 'cambiar-password', component: ChangePasswordAnalistComponent, canActivate: [NoAuthGuard] },
  { path: 'reportes', component: ReportesAnalistComponent, canActivate: [NoAuthGuard] },
  { path: 'consulta', component: ConsultaAnalistComponent, canActivate: [NoAuthGuard] },
  { path: '', redirectTo: 'home-page', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalistRoutingModule { }
