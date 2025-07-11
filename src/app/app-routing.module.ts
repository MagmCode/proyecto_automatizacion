import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from "./core/guards/no-auth.guard";
import { AuthGuard } from './core/guards/auth.guard'; 

import { UnauthorizedComponent } from './modules/pages/unauthorized/unauthorized.component';
import { AnalistGuard } from './core/guards/analist.guard';


const routes: Routes = [
  // Main Routes

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  { path: 'unauthorized', component: UnauthorizedComponent },

  {
    path: 'admin',
    canActivate: [NoAuthGuard],
    loadChildren: () => import('./modules/rol/admin/admin.module').then(m => m.AdminModule)
  },

  // Routes to Analist's components
  {
    path: 'analist',
    canActivate: [NoAuthGuard],
    loadChildren: () => import('./modules/rol/analist/analist.module').then(m => m.AnalistModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
