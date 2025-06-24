import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCartaavalComponent } from './detalle-cartaaval.component';

describe('DetalleCartaavalComponent', () => {
  let component: DetalleCartaavalComponent;
  let fixture: ComponentFixture<DetalleCartaavalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCartaavalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCartaavalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
