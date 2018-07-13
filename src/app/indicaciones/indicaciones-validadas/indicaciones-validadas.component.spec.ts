import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicacionesValidadasComponent } from './indicaciones-validadas.component';

describe('IndicacionesValidadasComponent', () => {
  let component: IndicacionesValidadasComponent;
  let fixture: ComponentFixture<IndicacionesValidadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicacionesValidadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicacionesValidadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
