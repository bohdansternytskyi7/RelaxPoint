import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ServicesService } from '../services.service';
import { Service } from './service.model';
import { ReservationDialogComponent } from './reservation-dialog/reservation-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit, OnDestroy {
  @ViewChild('dialogContainer', { read: ViewContainerRef }) container!: ViewContainerRef;
  services: Service[] = [];
  loading = true;
  error: string | null = null;
  isDialogOpen = false;
  selectedService?: Service;

  private subs: Subscription[] = [];

  constructor(private servicesService: ServicesService, private componentFactoryResolver: ComponentFactoryResolver) {}

  openDialog(service: Service) {
    const dialogFactory = this.componentFactoryResolver.resolveComponentFactory(ReservationDialogComponent);
    const dialogRef = this.container.createComponent(dialogFactory);
    dialogRef.instance.defaultService = this.services.find(s => s.id === service.id);
    dialogRef.instance.services = this.services;
    this.subs.push(dialogRef.instance.closed.subscribe(() => {
      dialogRef.destroy();
    }));
    this.subs.push(dialogRef.instance.confirmReservation.subscribe(res => {
      console.log(res.service);
      dialogRef.destroy();
    }));
  }

  ngOnInit(): void {
    this.servicesService.getServices().subscribe({
      next: (data) => {
        this.services = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Wystąpił błąd podczas ładowania usług.';
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
