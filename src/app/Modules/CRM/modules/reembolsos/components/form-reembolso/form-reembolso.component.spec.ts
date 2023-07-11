import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReembolsoComponent } from './form-reembolso.component';

describe('FormReembolsoComponent', () => {
  let component: FormReembolsoComponent;
  let fixture: ComponentFixture<FormReembolsoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormReembolsoComponent]
    });
    fixture = TestBed.createComponent(FormReembolsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
