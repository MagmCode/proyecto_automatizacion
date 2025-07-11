import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProfileAdminComponent } from './edit-profile-admin/edit-profile-admin.component';
import { ChangePasswordAdminComponent } from './change-password-admin/change-password-admin.component';
import { AsignProfileComponent } from './asign-profile/asign-profile.component';

@NgModule({
  declarations: [
    DashboardComponent,
    EditProfileAdminComponent,
    ChangePasswordAdminComponent,
    AsignProfileComponent,
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
