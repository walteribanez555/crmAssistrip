import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharMonthComponent } from './char-month.component';

describe('CharMonthComponent', () => {
  let component: CharMonthComponent;
  let fixture: ComponentFixture<CharMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharMonthComponent]
    });
    fixture = TestBed.createComponent(CharMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
