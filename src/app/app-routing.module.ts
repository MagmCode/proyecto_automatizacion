import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';
import { NoAuthGuard } from "./core/guards/no-auth.guard";

import { DashboardComponent } from './modules/rol/admin/dashboard/dashboard.component';
import { ReembolsoAdminComponent } from './modules/rol/admin/reembolso-admin/reembolso-admin.component';
import { CartaavalAdminComponent } from './modules/rol/admin/cartaaval-admin/cartaaval-admin.component';
import { EditProfileAdminComponent } from './modules/rol/admin/edit-profile-admin/edit-profile-admin.component';
import { ChangePasswordAdminComponent } from './modules/rol/admin/change-password-admin/change-password-admin.component';
import { HistorialComponent } from './modules/rol/admin/historial/historial.component';
import { AsignProfileComponent } from './modules/rol/admin/asign-profile/asign-profile.component';
import { UserGuard } from './core/guards/user.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { UnauthorizedComponent } from './modules/pages/unauthorized/unauthorized.component';
import { ReportesComponent } from './modules/rol/admin/reportes/reportes.component';
import { DetalleReembolsoComponent } from './modules/rol/admin/detalle-reembolso/detalle-reembolso.component';
import { DetalleCartaavalComponent } from './modules/rol/admin/detalle-cartaaval/detalle-cartaaval.component';
import { AnalistGuard } from './core/guards/analist.guard';


const routes: Routes = [
  // Main Routes

  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '**', redirectTo: 'sign-in' },
  { path: 'unauthorized', component: UnauthorizedComponent },


// // Routes to User's components
//   {path: 'user/home-page', component: HomePageComponent, canActivate: [UserGuard]},
//   {path: 'user/reembolso', component: ReembolsoComponent, canActivate: [UserGuard]},
//   {path: 'user/carta-aval', component: CartaAvalComponent, canActivate: [UserGuard]},
//   {path: 'user/editar-perfil', component: EditProfileComponent, canActivate: [UserGuard]},
//   {path: 'user/cambiar-password', component: ChangePasswordComponent, canActivate: [UserGuard]},

// Routes to Admin's components
  {path: 'admin/dashboard', component: DashboardComponent, canActivate: [NoAuthGuard]},
  {path: 'admin/reembolso', component: ReembolsoAdminComponent, canActivate: [NoAuthGuard]},
  {path: 'admin/carta-aval', component: CartaavalAdminComponent, canActivate: [NoAuthGuard]},
  {path: 'admin/editar-perfil', component: EditProfileAdminComponent, canActivate: [NoAuthGuard]},
  {path: 'admin/cambiar-password', component: ChangePasswordAdminComponent, canActivate: [NoAuthGuard]},
  {path: 'admin/historial', component: HistorialComponent, canActivate: [NoAuthGuard]},
  {path: 'admin/asignar-perfil', component: AsignProfileComponent, canActivate: [NoAuthGuard]},
  {path: 'admin/reportes', component: ReportesComponent, canActivate: [NoAuthGuard]},
  {path: 'admin/reembolso/detalle/:id', component: DetalleReembolsoComponent, canActivate: [NoAuthGuard]},
  {path: 'admin/carta-aval/detalle/:id', component: DetalleCartaavalComponent, canActivate: [NoAuthGuard]},

  // Routes to Analist's components
  {
    path: 'analist',
    loadChildren: () => import('./modules/rol/analist/analist.module').then(m => m.AnalistModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
