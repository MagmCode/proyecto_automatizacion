import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaavalAnalistComponent } from './cartaaval-analist.component';

describe('CartaavalAnalistComponent', () => {
  let component: CartaavalAnalistComponent;
  let fixture: ComponentFixture<CartaavalAnalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartaavalAnalistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaavalAnalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
