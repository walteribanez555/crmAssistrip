import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCoberturaComponent } from './crear-cobertura.component';

describe('CrearCoberturaComponent', () => {
  let component: CrearCoberturaComponent;
  let fixture: ComponentFixture<CrearCoberturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCoberturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCoberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
