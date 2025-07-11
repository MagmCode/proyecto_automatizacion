import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AsignProfileComponent } from './asign-profile/asign-profile.component';
import { ChangePasswordAdminComponent } from './change-password-admin/change-password-admin.component';
import { EditProfileAdminComponent } from './edit-profile-admin/edit-profile-admin.component';
import { ConsultaAdminComponent } from './consulta-admin/consulta-admin.component';
import { ReportesAdminComponent } from './reportes-admin/reportes-admin.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'asignar-perfil', component: AsignProfileComponent},
  {path: 'cambiar-clave', component: ChangePasswordAdminComponent},
  {path: 'editar-perfil', component: EditProfileAdminComponent},
  {path: 'consulta', component: ConsultaAdminComponent},
  {path: 'reportes', component: ReportesAdminComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
