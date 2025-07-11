import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AnalistRoutingModule } from './analist-routing.module';
import { HomepageAnalistComponent } from './homepage-analist/homepage-analist.component';
import { EdirProfileAnalistComponent } from './edir-profile-analist/edir-profile-analist.component';
import { ChangePasswordAnalistComponent } from './change-password-analist/change-password-analist.component';
import { ConsultaAnalistComponent } from './consulta-analist/consulta-analist.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    HomepageAnalistComponent,
    EdirProfileAnalistComponent,
    ChangePasswordAnalistComponent,
    ConsultaAnalistComponent
  ],
  imports: [
    SharedModule,
    AnalistRoutingModule,
    CommonModule
  ]
})
export class AnalistModule { }
