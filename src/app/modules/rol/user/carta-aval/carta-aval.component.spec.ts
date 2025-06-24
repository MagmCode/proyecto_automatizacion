import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaAvalComponent } from './carta-aval.component';

describe('CartaAvalComponent', () => {
  let component: CartaAvalComponent;
  let fixture: ComponentFixture<CartaAvalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartaAvalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaAvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
