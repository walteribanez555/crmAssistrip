import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCampComponent } from './listado-camp.component';

describe('ListadoCampComponent', () => {
  let component: ListadoCampComponent;
  let fixture: ComponentFixture<ListadoCampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoCampComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoCampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
