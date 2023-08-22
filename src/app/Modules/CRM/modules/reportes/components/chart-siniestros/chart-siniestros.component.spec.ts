import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSiniestrosComponent } from './chart-siniestros.component';

describe('ChartSiniestrosComponent', () => {
  let component: ChartSiniestrosComponent;
  let fixture: ComponentFixture<ChartSiniestrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartSiniestrosComponent]
    });
    fixture = TestBed.createComponent(ChartSiniestrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
