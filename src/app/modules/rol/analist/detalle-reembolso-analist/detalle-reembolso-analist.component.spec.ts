import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleReembolsoAnalistComponent } from './detalle-reembolso-analist.component';

describe('DetalleReembolsoAnalistComponent', () => {
  let component: DetalleReembolsoAnalistComponent;
  let fixture: ComponentFixture<DetalleReembolsoAnalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleReembolsoAnalistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleReembolsoAnalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
