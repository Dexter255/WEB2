import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import { ReservedFlight } from 'src/app/models/flight/reserved-flight.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    public flightService: FlightService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.flightService.getReservedFlight().subscribe();
  }

  onReservedFlightDetails(flight: ReservedFlight){
    this.flightService.passengers = flight.Passengers;
    this.router.navigate(['flight', flight.FlightId], {relativeTo: this.route})
  }

  onReservedFlightCancel(flight: ReservedFlight){
    this.flightService.cancelReservation(flight.FlightId).subscribe(
      res => { 
        this.toastr.success(res['message'], 'Reservation');
        this.flightService.getReservedFlight().subscribe();
      },
      err => {
        this.toastr.error(err.error['message'], 'Reservation');
      }
    );
  }
}
