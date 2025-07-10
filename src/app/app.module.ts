import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER, MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatRadioModule} from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {  MatTooltipModule } from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete';
import {MAT_CHIPS_DEFAULT_OPTIONS, MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CsrfInterceptor } from './services/csrf.interceptor';
// import { MatListModule } from '@angular/material/list';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { CUSTOM_DATE_FORMATS } from './core/custom-date-formats';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';



import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';
// import { HomePageComponent } from './modules/rol/user/home-page/home-page.component';
// import { FooterComponent } from './modules/pages/footer/footer.component';
// import { HeaderComponent } from './modules/pages/header/header.component';
// import { ForgotPasswordComponent } from './modules/rol/user/forgot-password/forgot-password.component';
// import { ReembolsoComponent } from './modules/rol/user/reembolso/reembolso.component';
// import { CartaAvalComponent } from './modules/rol/user/carta-aval/carta-aval.component';
// import { EditProfileComponent } from './modules/rol/user/edit-profile/edit-profile.component';
// import { ChangePasswordComponent } from './modules/rol/user/change-password/change-password.component';
// import { DashboardComponent } from './modules/rol/admin/dashboard/dashboard.component';
import { HistorialComponent } from './modules/rol/admin/historial/historial.component';
import { ReembolsoAdminComponent } from './modules/rol/admin/reembolso-admin/reembolso-admin.component';
import { CartaavalAdminComponent } from './modules/rol/admin/cartaaval-admin/cartaaval-admin.component';
import { EditProfileAdminComponent } from './modules/rol/admin/edit-profile-admin/edit-profile-admin.component';
import { ChangePasswordAdminComponent } from './modules/rol/admin/change-password-admin/change-password-admin.component';
import { AsignProfileComponent } from './modules/rol/admin/asign-profile/asign-profile.component';
import { UnauthorizedComponent } from './modules/pages/unauthorized/unauthorized.component';
// import { ReportesComponent } from './modules/rol/admin/reportes/reportes.component';
import { DetalleReembolsoComponent } from './modules/rol/admin/detalle-reembolso/detalle-reembolso.component';
import { DetalleCartaavalComponent } from './modules/rol/admin/detalle-cartaaval/detalle-cartaaval.component';
// import { HomepageAnalistComponent } from './modules/rol/analist/homepage-analist/homepage-analist.component';
// import { DetalleCartaavalAnalistComponent } from './modules/rol/analist/detalle-cartaaval-analist/detalle-cartaaval-analist.component';
// import { ChangePasswordAnalistComponent } from './modules/rol/analist/change-password-analist/change-password-analist.component';
// import { CartaavalAnalistComponent } from './modules/rol/analist/cartaaval-analist/cartaaval-analist.component';
// import { ReembolsoAnalistComponent } from './modules/rol/analist/reembolso-analist/reembolso-analist.component';
// import { DetalleReembolsoAnalistComponent } from './modules/rol/analist/detalle-reembolso-analist/detalle-reembolso-analist.component';
// import { EdirProfileAnalistComponent } from './modules/rol/analist/edir-profile-analist/edir-profile-analist.component';
// import { HistorialAnalistComponent } from './modules/rol/analist/historial-analist/historial-analist.component';
// import { ReportesAnalistComponent } from './modules/rol/analist/reportes-analist/reportes-analist.component';
import { CedulaLengthDirective } from './directives/cedula-length.directive';
import { TelefonoLengthDirective } from './directives/telefono-length.directive';
import { MaxLengthDirective } from './directives/max-length.directive';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    // HomePageComponent,
    // FooterComponent,
    // HeaderComponent,
    // ForgotPasswordComponent,
    // ReembolsoComponent,
    // CartaAvalComponent,
    // EditProfileComponent,
    // ChangePasswordComponent,
    // DashboardComponent,
    HistorialComponent,
    ReembolsoAdminComponent,
    CartaavalAdminComponent,
    EditProfileAdminComponent,
    ChangePasswordAdminComponent,
    AsignProfileComponent,
    UnauthorizedComponent,
    // ReportesComponent,
    DetalleReembolsoComponent,
    DetalleCartaavalComponent,
    // --- INICIO: Eliminar componentes de analist para evitar doble declaración ---
    // HomepageAnalistComponent,
    // DetalleCartaavalAnalistComponent,
    // ChangePasswordAnalistComponent,
    // CartaavalAnalistComponent,
    // ReembolsoAnalistComponent,
    // DetalleReembolsoAnalistComponent,
    // EdirProfileAnalistComponent,
    // HistorialAnalistComponent,
    // ReportesAnalistComponent,
    // ConsultaAnalistComponent,
    // --- FIN: Eliminar componentes de analist ---
    CedulaLengthDirective,
    TelefonoLengthDirective,
    MaxLengthDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatDividerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatRadioModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatDialogModule,
    ScrollingModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatCardModule,
    MatSidenavModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    
    
    

    
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
export class AppModule { }
