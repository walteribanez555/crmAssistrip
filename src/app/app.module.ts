import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ServicesModule } from './services/services.module';
import { ComponentsModule } from './components/components.module';
import { HomeComponent } from './components/home/home.component';
import { CotizarComponent } from './components/cotizar/cotizar.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HelpComponent } from './components/help/help.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatosPolizasComponent } from './components/datos-polizas/datos-polizas.component';





@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LandingPageComponent,
    HomeComponent,
    CotizarComponent,
    AboutUsComponent,
    HelpComponent,
    DatosPolizasComponent

  ],
  imports: [
    BrowserModule,
    SweetAlert2Module.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
    
    
  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
