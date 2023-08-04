import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMonthComponent } from './modal-month.component';

describe('ModalMothComponent', () => {
  let component: ModalMonthComponent;
  let fixture: ComponentFixture<ModalMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMonthComponent]
    });
    fixture = TestBed.createComponent(ModalMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
