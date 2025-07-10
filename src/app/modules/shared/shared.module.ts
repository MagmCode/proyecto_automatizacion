import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../pages/header/header.component';
import { FooterComponent } from '../pages/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCard, MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule
  ]
})
export class SharedModule { }