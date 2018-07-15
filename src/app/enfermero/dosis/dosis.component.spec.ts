import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DosisComponent } from './dosis.component';

describe('DosisComponent', () => {
  let component: DosisComponent;
  let fixture: ComponentFixture<DosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DosisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
