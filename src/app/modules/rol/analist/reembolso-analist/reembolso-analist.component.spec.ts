import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReembolsoAnalistComponent } from './reembolso-analist.component';

describe('ReembolsoAnalistComponent', () => {
  let component: ReembolsoAnalistComponent;
  let fixture: ComponentFixture<ReembolsoAnalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReembolsoAnalistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReembolsoAnalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
