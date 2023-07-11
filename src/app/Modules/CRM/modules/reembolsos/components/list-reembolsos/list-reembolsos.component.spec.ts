import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReembolsosComponent } from './list-reembolsos.component';

describe('ListReembolsosComponent', () => {
  let component: ListReembolsosComponent;
  let fixture: ComponentFixture<ListReembolsosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListReembolsosComponent]
    });
    fixture = TestBed.createComponent(ListReembolsosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
