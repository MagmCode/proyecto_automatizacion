import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordAnalistComponent } from './change-password-analist.component';

describe('ChangePasswordAnalistComponent', () => {
  let component: ChangePasswordAnalistComponent;
  let fixture: ComponentFixture<ChangePasswordAnalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordAnalistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordAnalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
