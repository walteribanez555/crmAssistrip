import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleBenMonthComponent } from './sale-ben-month.component';

describe('SaleBenMonthComponent', () => {
  let component: SaleBenMonthComponent;
  let fixture: ComponentFixture<SaleBenMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleBenMonthComponent]
    });
    fixture = TestBed.createComponent(SaleBenMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
