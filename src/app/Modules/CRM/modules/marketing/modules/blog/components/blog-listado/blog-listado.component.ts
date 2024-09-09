import { Component, Inject, OnInit, inject } from '@angular/core';
import { BlogService } from '../../../../services/blog.service';
import { Blog } from '../../../../models/blog';

@Component({
  selector: 'blog-listado',
  templateUrl: './blog-listado.component.html',
  styleUrls: ['./blog-listado.component.css']
})
export class BlogListadoComponent implements OnInit {
  blogs : Blog[]= [];
  private blogService = inject(BlogService);

  isLoading : boolean = false;


  ngOnInit(): void {
    this.isLoading = true;
    this.blogService.getAllBlogs().subscribe(
      (resp : Blog[]) => {
        this.blogs = resp;
        this.isLoading = false;
      }
    )

  }







}
