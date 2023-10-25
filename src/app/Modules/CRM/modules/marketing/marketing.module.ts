import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketingRoutingModule } from './marketing-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { NotificationsService } from './services/notifications.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { ImagesService } from './services/images.service';
import { BlogComponent } from './pages/blog/blog.component';
import { QuillModule } from 'ngx-quill';
import { BlogListadoComponent } from './components/blog-listado/blog-listado.component';
import { BlogBuilderComponent } from './components/blog-builder/blog-builder.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    NotificationsComponent,
    BlogComponent,
    BlogListadoComponent,
    BlogBuilderComponent
  ],
  imports: [
    CommonModule,
    MarketingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    QuillModule,
  ],
  providers: [
    NotificationsService,
    ImagesService,
  ]
})
export class MarketingModule { }
