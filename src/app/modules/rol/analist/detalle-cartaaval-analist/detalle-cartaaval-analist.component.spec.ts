import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCartaavalAnalistComponent } from './detalle-cartaaval-analist.component';

describe('DetalleCartaavalAnalistComponent', () => {
  let component: DetalleCartaavalAnalistComponent;
  let fixture: ComponentFixture<DetalleCartaavalAnalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCartaavalAnalistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCartaavalAnalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
