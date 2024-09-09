import { Component, Input, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);



  ngOnInit(): void {
    this.dateTimeNow = new Date().toISOString().split('T')[0].replace(/-/g, "/");

    this.imgUrlView = this.urlImg?.value;

  }



  dateTimeNow : string = "";
  @Input() title : FormControl  | null= null;
  @Input() urlImg : FormControl  | null = null;
  @Input() description : FormControl  | null =  null;

  imgUrlView = "";


  @Input() form : FormControl | null = null;





  onFileSelected(event: any) {
    const file = event.target.files[0];

    this.extractBase64(file).then((image: any) => {
      this.imgUrlView = image.base;
    });
    this.urlImg!.setValue(file);
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






}
