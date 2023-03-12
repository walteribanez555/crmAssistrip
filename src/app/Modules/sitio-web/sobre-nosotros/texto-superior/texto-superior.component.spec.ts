import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoSuperiorComponent } from './texto-superior.component';

describe('TextoSuperiorComponent', () => {
  let component: TextoSuperiorComponent;
  let fixture: ComponentFixture<TextoSuperiorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextoSuperiorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextoSuperiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
