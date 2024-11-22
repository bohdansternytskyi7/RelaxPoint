import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Service } from './service.model';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {
  services: Service[] = [];
  loading = true;
  error: string | null = null;

  constructor(private servicesService: ServicesService) {}

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
}
