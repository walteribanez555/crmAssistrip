import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketingRoutingModule } from './marketing-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { NotificationsService } from './services/notifications.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { ImagesService } from './services/images.service';
import { QuillModule } from 'ngx-quill';



@NgModule({
  declarations: [
    LayoutPageComponent,
    NotificationsComponent,

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
  ]
})
export class MarketingModule { }
