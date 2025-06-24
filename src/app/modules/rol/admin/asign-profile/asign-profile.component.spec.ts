import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignProfileComponent } from './asign-profile.component';

describe('AsignProfileComponent', () => {
  let component: AsignProfileComponent;
  let fixture: ComponentFixture<AsignProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
