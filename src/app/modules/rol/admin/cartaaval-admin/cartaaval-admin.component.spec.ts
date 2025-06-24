import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaavalAdminComponent } from './cartaaval-admin.component';

describe('CartaavalAdminComponent', () => {
  let component: CartaavalAdminComponent;
  let fixture: ComponentFixture<CartaavalAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartaavalAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaavalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
