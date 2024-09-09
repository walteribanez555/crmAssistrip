import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { EditComponent } from './pages/edit/edit.component';
import { BlogBuilderComponent } from './pages/blog-builder/blog-builder.component';
import { BlogComponent } from './pages/blog/blog.component';

const routes: Routes = [
  {
    path: '',
    component : LayoutPageComponent,
    children: [
      {
        path : 'post',
        component : BlogBuilderComponent,
      },
      {
        path: ':id',
        component : BlogComponent,
      },
      {
        path : ':id/edit',
        component : EditComponent,
      },



    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }
