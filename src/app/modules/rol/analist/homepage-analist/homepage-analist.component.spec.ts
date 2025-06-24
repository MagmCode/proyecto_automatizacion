import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageAnalistComponent } from './homepage-analist.component';

describe('HomepageAnalistComponent', () => {
  let component: HomepageAnalistComponent;
  let fixture: ComponentFixture<HomepageAnalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageAnalistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageAnalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
