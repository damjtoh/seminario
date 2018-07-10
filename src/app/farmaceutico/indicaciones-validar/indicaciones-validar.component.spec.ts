import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicacionesValidarComponent } from './indicaciones-validar.component';

describe('IndicacionesValidarComponent', () => {
  let component: IndicacionesValidarComponent;
  let fixture: ComponentFixture<IndicacionesValidarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicacionesValidarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicacionesValidarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
