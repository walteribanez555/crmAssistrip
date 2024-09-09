import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostingComponent } from './blog-posting.component';

describe('BlogPostingComponent', () => {
  let component: BlogPostingComponent;
  let fixture: ComponentFixture<BlogPostingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogPostingComponent]
    });
    fixture = TestBed.createComponent(BlogPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
