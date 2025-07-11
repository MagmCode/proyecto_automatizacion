import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAdminComponent } from './consulta-admin.component';

describe('ConsultaAdminComponent', () => {
  let component: ConsultaAdminComponent;
  let fixture: ComponentFixture<ConsultaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
