import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {

  blog = {

    titulo : '',
    descripcion : ''

  }

  guardar(form : NgForm) {

    console.log(form.value);

  }

}
