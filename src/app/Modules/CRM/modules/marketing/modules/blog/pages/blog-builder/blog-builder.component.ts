import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagesService } from '../../../../services/images.service';
import Quill from 'quill';
import { FormControl, FormGroup } from '@angular/forms';
import { BlogService } from '../../../../services/blog.service';
import { Blog, BlogDto } from '../../../../models/blog';

@Component({
  templateUrl: './blog-builder.component.html',
  styleUrls: ['./blog-builder.component.css']
})
export class BlogBuilderComponent {


  blog = new FormControl(null);

  description_card = new FormControl(null);
  title_card = new FormControl(null);
  url_img = new FormControl( "../../../../../../../assets/images/ASSISTRIP/app y web/4.jpg");


  private blogService = inject(BlogService);
  private imageService = inject(ImagesService);


  pos : number = 0;
  dynamicWidth = '0%';
  width : number = 0;


  onChangeStepForm(posToChange : number ){

    if(posToChange >= 0  && posToChange<=3){

      this.width = posToChange*33;
      this.dynamicWidth = this.width+"%";

      this.pos = posToChange;
    }

  }

  prueba() {
    console.log(this.url_img.value);
    console.log(this.blog.value);
    console.log(this.title_card.value);
    console.log(this.description_card.value);
  }

  async handleEvent( event : any) {
    console.log(this.url_img.value);

    const fileToUpload : any = this.url_img.value;

    const file  = fileToUpload as File;
    this.imageService.subirArchivo(file);

    try {
      const res: any = await this.imageService.subirArchivo(file);
      const newBlog : BlogDto = {
        post : this.blog.value ?? "",
        titulo : this.title_card.value ?? "",
        descripcion : this.description_card.value ?? "",
        img_url : res.Location ,
      }

      this.blogService.postBlog(newBlog).subscribe({
        next(value) {
            console.log(value);
        },
        error(err) {
            console.log(err);
        },
        complete() {
            console.log("Realizado correctamente");
        },
      })


    } catch (error) {
      console.error('Error al subir el archivo:', error);
    }


  }

}
