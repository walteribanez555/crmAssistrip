import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharDayComponent } from './char-day.component';

describe('CharDayComponent', () => {
  let component: CharDayComponent;
  let fixture: ComponentFixture<CharDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharDayComponent]
    });
    fixture = TestBed.createComponent(CharDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
