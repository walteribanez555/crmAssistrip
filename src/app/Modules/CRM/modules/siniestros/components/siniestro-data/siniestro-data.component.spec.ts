import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiniestroDataComponent } from './siniestro-data.component';

describe('SiniestroDataComponent', () => {
  let component: SiniestroDataComponent;
  let fixture: ComponentFixture<SiniestroDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiniestroDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiniestroDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
