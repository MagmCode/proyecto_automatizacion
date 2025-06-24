import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleReembolsoComponent } from './detalle-reembolso.component';

describe('DetalleReembolsoComponent', () => {
  let component: DetalleReembolsoComponent;
  let fixture: ComponentFixture<DetalleReembolsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleReembolsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleReembolsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
