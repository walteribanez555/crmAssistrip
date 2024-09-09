import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogListadoComponent } from './blog-listado.component';

describe('BlogListadoComponent', () => {
  let component: BlogListadoComponent;
  let fixture: ComponentFixture<BlogListadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogListadoComponent]
    });
    fixture = TestBed.createComponent(BlogListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
