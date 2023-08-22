import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSiniestroComponent } from './modal-siniestro.component';

describe('ModalSiniestroComponent', () => {
  let component: ModalSiniestroComponent;
  let fixture: ComponentFixture<ModalSiniestroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSiniestroComponent]
    });
    fixture = TestBed.createComponent(ModalSiniestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
