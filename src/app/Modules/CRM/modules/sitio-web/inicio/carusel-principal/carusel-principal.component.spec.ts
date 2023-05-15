import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaruselPrincipalComponent } from './carusel-principal.component';

describe('CaruselPrincipalComponent', () => {
  let component: CaruselPrincipalComponent;
  let fixture: ComponentFixture<CaruselPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaruselPrincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaruselPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
