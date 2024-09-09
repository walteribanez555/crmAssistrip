import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'blog-preview',
  templateUrl: './blog-preview.component.html',
  styleUrls: ['./blog-preview.component.css']
})
export class BlogPreviewComponent implements OnInit {

  @Input() blog : FormControl  | null = null ;
  @Input() title : FormControl  | null= null;
  @Input() urlImg : FormControl  | null = null;
  @Input() description : FormControl  | null =  null;

  imgUrlView = "";
  dateTimeNow : string = "";

  ngOnInit(): void {
    this.dateTimeNow = new Date().toISOString().split('T')[0].replace(/-/g, "/");


    this.extractBase64(this.urlImg?.value).then((image: any) => {
      this.imgUrlView = image.base;
    });

  }

  extractBase64 = async (event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL(event);
        const image = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL(event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            blob: event,
            image,
          });
        };
      } catch {
        console.log('error on image Upload');
      }
    });



  private sanitizer = inject(DomSanitizer);

  htmlContent =  this.blog ? this.sanitizer.bypassSecurityTrustHtml(this.blog.value.replace('<img', '<img style="width: 100%"')) : "";



}
