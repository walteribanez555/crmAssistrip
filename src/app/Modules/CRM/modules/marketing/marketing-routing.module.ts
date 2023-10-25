import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from '../siniestros/pages';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { BlogComponent } from './pages/blog/blog.component';

const routes: Routes = [
  {
    path: 'marketing',
    component : LayoutPageComponent,
    children: [
      {
        path : 'notificaciones',
        component : NotificationsComponent,
      },
      {
        path : 'blogs',
        component : BlogComponent,
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketingRoutingModule { }
