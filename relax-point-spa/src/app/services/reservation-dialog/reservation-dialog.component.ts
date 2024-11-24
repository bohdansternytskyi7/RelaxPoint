import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Service } from '../service.model';

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.scss'],
})
export class ReservationDialogComponent implements OnInit {
  @Input() services: Service[] = [];
  @Input() defaultService?: Service;
  @Output() confirmReservation = new EventEmitter<{ service: Service; date: string, time: string }>();
  @Output() closed = new EventEmitter<void>();

  selectedServiceId: number | null = null;
  selectedDate: string | null = null;
  selectedTime: string | null = null;
  availableTimes: string[] = [];

  ngOnInit() {
    this.generateAvailableTimes();
    if (this.defaultService) {
      this.selectedServiceId = this.defaultService.id;
    }
  }

  generateAvailableTimes() {
    const startHour = 7;
    const endHour = 23;
    for (let hour = startHour; hour < endHour; hour++) {
      this.availableTimes.push(`${hour}:00`);
      this.availableTimes.push(`${hour}:30`);
    }
  }

  close() {
    this.closed.emit();
  }

  confirm() {
    if (this.selectedServiceId && this.selectedDate && this.selectedTime) {
      const selectedService = this.services.find(s => s.id === this.selectedServiceId);
      if (selectedService) {
        this.confirmReservation.emit({
          service: selectedService,
          time: this.selectedTime,
          date: this.selectedDate
        });
      }
    }
  }


  trackByService(index: number, service: Service): any {
    return service.id;
  }
}
