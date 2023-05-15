import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerIntermedioComponent } from './banner-intermedio.component';

describe('BannerIntermedioComponent', () => {
  let component: BannerIntermedioComponent;
  let fixture: ComponentFixture<BannerIntermedioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerIntermedioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerIntermedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
