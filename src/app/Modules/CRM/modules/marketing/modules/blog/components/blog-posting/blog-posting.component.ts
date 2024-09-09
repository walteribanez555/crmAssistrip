import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'blog-posting',
  templateUrl: './blog-posting.component.html',
  styleUrls: ['./blog-posting.component.css']
})
export class BlogPostingComponent {

  @Output() customEvent = new EventEmitter();

  emitEvent() {
    this.customEvent.emit();
  }




}
