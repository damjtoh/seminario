import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicacionesPendientesComponent } from './indicaciones-pendientes.component';

describe('IndicacionesPendientesComponent', () => {
  let component: IndicacionesPendientesComponent;
  let fixture: ComponentFixture<IndicacionesPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicacionesPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicacionesPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
