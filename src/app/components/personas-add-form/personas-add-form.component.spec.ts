import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasAddFormComponent } from './personas-add-form.component';

describe('PersonasAddFormComponent', () => {
  let component: PersonasAddFormComponent;
  let fixture: ComponentFixture<PersonasAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonasAddFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonasAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
