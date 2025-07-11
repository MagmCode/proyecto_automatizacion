import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../pages/header/header.component';
import { FooterComponent } from '../pages/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatDateRangeInput, MatDateRangePicker, MatDatepickerToggle, MatDatepickerContent } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CedulaLengthDirective } from 'src/app/directives/cedula-length.directive';
import { TelefonoLengthDirective } from 'src/app/directives/telefono-length.directive';
import { MaxLengthDirective } from 'src/app/directives/max-length.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CedulaLengthDirective,
    TelefonoLengthDirective,
    MaxLengthDirective
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CedulaLengthDirective,
    TelefonoLengthDirective,
    MaxLengthDirective,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ]
})
export class SharedModule { }