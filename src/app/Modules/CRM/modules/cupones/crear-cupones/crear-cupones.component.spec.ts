import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCuponesComponent } from './crear-cupones.component';

describe('CrearCuponesComponent', () => {
  let component: CrearCuponesComponent;
  let fixture: ComponentFixture<CrearCuponesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCuponesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCuponesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
