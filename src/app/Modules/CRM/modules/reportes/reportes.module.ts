import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesRoutingModule } from './reportes-routing.module';
import { VentasComponent } from './pages/ventas/ventas.component';
import { SiniestrosComponent } from './pages/siniestros/siniestros.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { PipesModule } from 'src/app/Modules/shared/pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';
import { SaleMonthComponent } from './components/sale-month/sale-month.component';
import { CharMonthComponent } from './components/char-month/char-month.component';
import { ModalMonthComponent } from './components/modal-month/modal-month.component';
import { CharDayComponent } from './components/char-day/char-day.component';
import { SaleBenMonthComponent } from './components/sale-ben-month/sale-ben-month.component';



@NgModule({
  declarations: [
    VentasComponent,
    SiniestrosComponent,
    LayoutPageComponent,
    SaleMonthComponent,
    CharMonthComponent,
    ModalMonthComponent,
    CharDayComponent,
    SaleBenMonthComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    SharedModule,
    PipesModule,
    ComponentsModule,
  ]
})
export class ReportesModule { }
