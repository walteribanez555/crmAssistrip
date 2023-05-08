import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCampComponent } from './crear-camp.component';

describe('CrearCampComponent', () => {
  let component: CrearCampComponent;
  let fixture: ComponentFixture<CrearCampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCampComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
