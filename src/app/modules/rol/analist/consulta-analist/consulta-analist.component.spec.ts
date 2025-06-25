import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAnalistComponent } from './consulta-analist.component';

describe('ConsultaAnalistComponent', () => {
  let component: ConsultaAnalistComponent;
  let fixture: ComponentFixture<ConsultaAnalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaAnalistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaAnalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
