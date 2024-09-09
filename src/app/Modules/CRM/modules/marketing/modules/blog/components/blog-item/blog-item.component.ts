import { Component, Input } from '@angular/core';
import { Blog } from '../../../../models/blog';

@Component({
  selector: 'blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css']
})
export class BlogItemComponent {

  @Input() blog! : Blog;

}
