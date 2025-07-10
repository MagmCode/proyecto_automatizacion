import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from 'src/app/app-routing.module'; 
import { AppComponent } from 'src/app/app.component'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CsrfInterceptor } from 'src/app/services/csrf.interceptor'; 
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { CUSTOM_DATE_FORMATS } from 'src/app/core/custom-date-formats'; 
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { SharedModule } from '../../shared/shared.module';


// import { FooterComponent } from '../../pages/footer/footer.component'; 
// import { HeaderComponent } from '../../pages/header/header.component'; 
import { AnalistRoutingModule } from './analist-routing.module';
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


@NgModule({
  declarations: [
    // FooterComponent,
    // HeaderComponent,
    HomepageAnalistComponent,
    ReembolsoAnalistComponent,
    CartaavalAnalistComponent,
    EdirProfileAnalistComponent,
    ChangePasswordAnalistComponent,
    HistorialAnalistComponent,
    DetalleReembolsoAnalistComponent,
    DetalleCartaavalAnalistComponent,
    ReportesAnalistComponent,
    ConsultaAnalistComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AnalistRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } }
  ],
  bootstrap: [AppComponent]
})
export class AnalistModule { }
