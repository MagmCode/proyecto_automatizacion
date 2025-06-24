import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialAnalistComponent } from './historial-analist.component';

describe('HistorialAnalistComponent', () => {
  let component: HistorialAnalistComponent;
  let fixture: ComponentFixture<HistorialAnalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialAnalistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialAnalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
