import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';
import { NoAuthGuard } from "./core/guards/no-auth.guard";
import { HomePageComponent } from './modules/rol/user/home-page/home-page.component';
import { ForgotPasswordComponent } from './modules/rol/user/forgot-password/forgot-password.component';
import { ReembolsoComponent } from './modules/rol/user/reembolso/reembolso.component';
import { CartaAvalComponent } from './modules/rol/user/carta-aval/carta-aval.component';
import { AuthGuard } from './core/guards/auth.guard';
import { EditProfileComponent } from './modules/rol/user/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './modules/rol/user/change-password/change-password.component';
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
import { HomepageAnalistComponent } from './modules/rol/analist/homepage-analist/homepage-analist.component';
import { ReembolsoAnalistComponent } from './modules/rol/analist/reembolso-analist/reembolso-analist.component';
import { CartaavalAnalistComponent } from './modules/rol/analist/cartaaval-analist/cartaaval-analist.component';
import { EdirProfileAnalistComponent } from './modules/rol/analist/edir-profile-analist/edir-profile-analist.component';
import { ChangePasswordAnalistComponent } from './modules/rol/analist/change-password-analist/change-password-analist.component';
import { HistorialAnalistComponent } from './modules/rol/analist/historial-analist/historial-analist.component';
import { DetalleReembolsoAnalistComponent } from './modules/rol/analist/detalle-reembolso-analist/detalle-reembolso-analist.component';
import { DetalleCartaavalAnalistComponent } from './modules/rol/analist/detalle-cartaaval-analist/detalle-cartaaval-analist.component';
import { ReportesAnalistComponent } from './modules/rol/analist/reportes-analist/reportes-analist.component';

const routes: Routes = [
  // Main Routes

  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '**', redirectTo: 'sign-in' },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },


// Routes to User's components
  {path: 'user/home-page', component: HomePageComponent, canActivate: [UserGuard]},
  {path: 'user/reembolso', component: ReembolsoComponent, canActivate: [UserGuard]},
  {path: 'user/carta-aval', component: CartaAvalComponent, canActivate: [UserGuard]},
  {path: 'user/editar-perfil', component: EditProfileComponent, canActivate: [UserGuard]},
  {path: 'user/cambiar-password', component: ChangePasswordComponent, canActivate: [UserGuard]},

// Routes to Admin's components
  {path: 'admin/dashboard', component: DashboardComponent, canActivate: [AdminGuard]},
  {path: 'admin/reembolso', component: ReembolsoAdminComponent, canActivate: [AdminGuard]},
  {path: 'admin/carta-aval', component: CartaavalAdminComponent, canActivate: [AdminGuard]},
  {path: 'admin/editar-perfil', component: EditProfileAdminComponent, canActivate: [AdminGuard]},
  {path: 'admin/cambiar-password', component: ChangePasswordAdminComponent, canActivate: [AdminGuard]},
  {path: 'admin/historial', component: HistorialComponent, canActivate: [AdminGuard]},
  {path: 'admin/asignar-perfil', component: AsignProfileComponent, canActivate: [AdminGuard]},
  {path: 'admin/reportes', component: ReportesComponent, canActivate: [AdminGuard]},
  {path: 'admin/reembolso/detalle/:id', component: DetalleReembolsoComponent, canActivate: [AdminGuard]},
  {path: 'admin/carta-aval/detalle/:id', component: DetalleCartaavalComponent, canActivate: [AdminGuard]},

  // Routes to Analist's components
  {path: 'analist/home-page', component: HomepageAnalistComponent, canActivate: [AnalistGuard]},
  {path: 'analist/reembolso', component: ReembolsoAnalistComponent, canActivate: [AnalistGuard]},
  {path: 'analist/carta-aval', component: CartaavalAnalistComponent, canActivate: [AnalistGuard]},
  {path: 'analist/editar-perfil', component: EdirProfileAnalistComponent, canActivate: [AnalistGuard]},
  {path: 'analist/cambiar-password', component: ChangePasswordAnalistComponent, canActivate: [AnalistGuard]},
  {path: 'analist/historial', component: HistorialAnalistComponent, canActivate: [AnalistGuard]},
  {path: 'analist/reportes', component: ReportesAnalistComponent, canActivate: [AnalistGuard]},
  {path: 'analist/reembolso/detalle/:id', component: DetalleReembolsoAnalistComponent, canActivate: [AnalistGuard]},
  {path: 'analist/carta-aval/detalle/:id', component: DetalleCartaavalAnalistComponent, canActivate: [AnalistGuard]},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
