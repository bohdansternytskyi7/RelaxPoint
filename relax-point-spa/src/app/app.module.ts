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
import { ReservationDialogComponent } from './services/reservation-dialog/reservation-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AdminPanelComponent,
    RegisterComponent,
    LoginComponent,
    ServicesListComponent,
    ReservationListComponent,
    ReservationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ ServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
