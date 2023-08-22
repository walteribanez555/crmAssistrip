import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiniestroMonthComponent } from './siniestro-month.component';

describe('SiniestroMonthComponent', () => {
  let component: SiniestroMonthComponent;
  let fixture: ComponentFixture<SiniestroMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiniestroMonthComponent]
    });
    fixture = TestBed.createComponent(SiniestroMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
