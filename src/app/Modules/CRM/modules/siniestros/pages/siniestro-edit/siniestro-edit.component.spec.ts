import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiniestroEditComponent } from './siniestro-edit.component';

describe('SiniestroEditComponent', () => {
  let component: SiniestroEditComponent;
  let fixture: ComponentFixture<SiniestroEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiniestroEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiniestroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
