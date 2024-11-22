import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/home-page.component';
import { ServicesListComponent } from './services/services-list.component';
import { ReservationListComponent } from './reservations/reservation-list.component';
import { AdminPanelComponent } from './admin/admin-panel.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'services', component: ServicesListComponent },
  { path: 'reservations', component: ReservationListComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
