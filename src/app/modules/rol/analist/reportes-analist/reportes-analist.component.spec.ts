import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesAnalistComponent } from './reportes-analist.component';

describe('ReportesAnalistComponent', () => {
  let component: ReportesAnalistComponent;
  let fixture: ComponentFixture<ReportesAnalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesAnalistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesAnalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
