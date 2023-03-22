import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDatesDestinationComponent } from './form-dates-destination.component';

describe('FormDatesDestinationComponent', () => {
  let component: FormDatesDestinationComponent;
  let fixture: ComponentFixture<FormDatesDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDatesDestinationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDatesDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
