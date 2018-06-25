import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarIndicacionComponent } from './generar-indicacion.component';

describe('GenerarIndicacionComponent', () => {
  let component: GenerarIndicacionComponent;
  let fixture: ComponentFixture<GenerarIndicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarIndicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarIndicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
