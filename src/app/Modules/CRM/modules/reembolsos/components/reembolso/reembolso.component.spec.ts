import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReembolsoItemComponent } from './reembolso.component';

describe('ReembolsoComponent', () => {
  let component: ReembolsoItemComponent;
  let fixture: ComponentFixture<ReembolsoItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReembolsoItemComponent]
    });
    fixture = TestBed.createComponent(ReembolsoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
