import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { EditComponent } from './pages/edit/edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { BlogBuilderComponent } from './pages/blog-builder/blog-builder.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { BlogItemComponent } from './components/blog-item/blog-item.component';
import { BlogListadoComponent } from './components/blog-listado/blog-listado.component';
import { BlogPostingComponent } from './components/blog-posting/blog-posting.component';
import { BlogPreviewComponent } from './components/blog-preview/blog-preview.component';
import { PostBuilderComponent } from './components/post-builder/post-builder.component';
import { QuillModule } from 'ngx-quill';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogService } from '../../services/blog.service';



@NgModule({
  declarations: [
    LayoutPageComponent,
    EditComponent,
    BlogListadoComponent,
    BlogBuilderComponent,
    BlogItemComponent,
    PostBuilderComponent,
    BlogCardComponent,
    BlogPreviewComponent,
    BlogPostingComponent,
    BlogComponent
  ],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    QuillModule
  ],
  providers: [
    BlogService,
  ]

})
export class BlogsModule { }
