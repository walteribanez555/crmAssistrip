import { Component, OnInit, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BlogService } from '../../../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../../../models/blog';

@Component({
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent  implements OnInit {

  private blogService = inject(BlogService);
  private route = inject(ActivatedRoute);

  isLoading : Boolean = false;

  blogToShow :Blog[] = [];


  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.blogService.getByIdBlog(id).subscribe(
        response => {
          console.log(response);
          this.blogToShow = response;
          this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(this.blogToShow[0].post.replace('<img', '<img style="width: 100%"'));
          this.isLoading =false;
        }
      )

      // You can perform further actions with the ID here
    });



  }




  private sanitizer = inject(DomSanitizer);

  htmlContent =  this.sanitizer.bypassSecurityTrustHtml(''.replace('<img', '<img style="width: 100%"'));



}
