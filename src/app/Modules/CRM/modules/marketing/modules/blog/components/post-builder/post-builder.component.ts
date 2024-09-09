import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagesService } from '../../../../services/images.service';
import Quill from 'quill';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'post-builder',
  templateUrl: './post-builder.component.html',
  styleUrls: ['./post-builder.component.css']
})
export class PostBuilderComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);
  private imageService = inject(ImagesService);


  @Input() blog : FormControl  | null = null ;





  constructor(){

  }
  ngOnInit(): void {
    console.log(this.blog);
  }

  @ViewChild('editor') editor: any;
  private quill: Quill | undefined;

  public files: any[] = [];


  // public preview: string | null = "Hola";






  mostrarTexto() {
    console.log(this.blog);

    // this.getImageUrls();
  }

  // ngAfterViewInit() {
  //   this.quill = new Quill('#editor', {
  //     // Quill configuration options
  //   });
  // }

  quillEditorRef: any;
  getEditorInstance(editorInstance: any) {
    this.quillEditorRef = editorInstance;

    console.log(editorInstance);

    const toolbar = this.quillEditorRef.getModule('toolbar');
    // toolbar.addHandler('image', this.imageHandler);
    toolbar.addHandler('image', this.uploadImageHandler);
  }


  uploadImageHandler = () => {
    console.log("Root image handler", this.quillEditorRef);
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file = input.files?.length ? input.files[0] : null;



      // this.extractBase64(file).then((image: any) => {
      //   console.log(image);
      //   this.quillEditorRef.insertEmbed(range.index, 'image', image);
      // });



      console.log('User trying to uplaod this:', file);

      console.log("this.quillEditorRef", this.quillEditorRef);
      const range = this.quillEditorRef.getSelection();

      if(file ) {


        try {
          const res: any = await this.imageService.subirArchivo(file);
          this.quillEditorRef.insertEmbed(range.index, 'image', res.Location);

        } catch (error) {
          console.error('Error al subir el archivo:', error);
        }

      }


    }
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
