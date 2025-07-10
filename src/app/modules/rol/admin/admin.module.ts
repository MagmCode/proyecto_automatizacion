import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CsrfInterceptor } from 'src/app/services/csrf.interceptor';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { CUSTOM_DATE_FORMATS } from 'src/app/core/custom-date-formats';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ReembolsoAdminComponent } from './reembolso-admin/reembolso-admin.component';
import { CartaavalAdminComponent } from './cartaaval-admin/cartaaval-admin.component';
import { EditProfileAdminComponent } from './edit-profile-admin/edit-profile-admin.component';
import { ChangePasswordAdminComponent } from './change-password-admin/change-password-admin.component';
import { HistorialComponent } from './historial/historial.component';
import { AsignProfileComponent } from './asign-profile/asign-profile.component';
import { ReportesComponent } from './reportes/reportes.component';
import { DetalleReembolsoComponent } from './detalle-reembolso/detalle-reembolso.component';
import { DetalleCartaavalComponent } from './detalle-cartaaval/detalle-cartaaval.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ReembolsoAdminComponent,
    CartaavalAdminComponent,
    EditProfileAdminComponent,
    ChangePasswordAdminComponent,
    HistorialComponent,
    AsignProfileComponent,
    ReportesComponent,
    DetalleReembolsoComponent,
    DetalleCartaavalComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } }
  ]
})
export class AdminModule { }
