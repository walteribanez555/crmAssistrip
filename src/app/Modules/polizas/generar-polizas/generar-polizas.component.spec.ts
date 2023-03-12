import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarPolizasComponent } from './generar-polizas.component';

describe('GenerarPolizasComponent', () => {
  let component: GenerarPolizasComponent;
  let fixture: ComponentFixture<GenerarPolizasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarPolizasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarPolizasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
