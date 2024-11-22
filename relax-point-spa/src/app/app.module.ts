import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home/home-page.component';
import { AdminPanelComponent } from './admin/admin-panel.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ServicesListComponent } from './services/services-list.component';
import { ReservationListComponent } from './reservations/reservation-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ServicesService } from './services.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AdminPanelComponent,
    RegisterComponent,
    LoginComponent,
    ServicesListComponent,
    ReservationListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ ServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
