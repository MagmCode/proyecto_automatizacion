import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdirProfileAnalistComponent } from './edir-profile-analist.component';

describe('EdirProfileAnalistComponent', () => {
  let component: EdirProfileAnalistComponent;
  let fixture: ComponentFixture<EdirProfileAnalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdirProfileAnalistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdirProfileAnalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
