import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReembolsoAdminComponent } from './reembolso-admin.component';

describe('ReembolsoAdminComponent', () => {
  let component: ReembolsoAdminComponent;
  let fixture: ComponentFixture<ReembolsoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReembolsoAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReembolsoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
