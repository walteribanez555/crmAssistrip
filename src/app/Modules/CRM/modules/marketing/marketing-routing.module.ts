import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from '../siniestros/pages';
import { NotificationsComponent } from './pages/notifications/notifications.component';

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
        loadChildren  : () => import('./modules/blog/blogs.module').then(m => m.BlogsModule)
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketingRoutingModule { }
