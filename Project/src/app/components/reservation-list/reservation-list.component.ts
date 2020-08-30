import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { FlightService } from '../flight.service';
import { ReservedFlight } from 'src/app/models/flight/reserved-flight.model';
import { VehicleService } from '../vehicle.service';
import { ReservedVehicle } from 'src/app/models/rent-a-car/reserved-vehicle.model';

@Component({
	selector: 'app-reservation-list',
	templateUrl: './reservation-list.component.html',
	styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

	constructor(private router: Router,
		private route: ActivatedRoute,
		private toastr: ToastrService,
		public flightService: FlightService,
		public vehicleService: VehicleService) { }

	ngOnInit(): void {
		this.flightService.getReservedFlight().subscribe();
		this.vehicleService.getReservedVehicles().subscribe();
	}

	onReservedFlightDetails(flight: ReservedFlight) {
		this.flightService.passengers = flight.Passengers;
		this.router.navigate(['flight', flight.FlightId], { relativeTo: this.route })
	}

	onReservedFlightCancel(flight: ReservedFlight) {
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

	onReservedVehicleDetails(vehicle: ReservedVehicle) {
		this.router.navigate(['vehicle', vehicle.Id], { relativeTo: this.route })
	}

	onReservedVehicleCancel(vehicle: ReservedVehicle) {
		this.vehicleService.cancelReservation(vehicle.VehicleId).subscribe(
			res => {
				this.toastr.success(res['message'], 'Reservation');
				this.vehicleService.getReservedVehicles().subscribe();
			},
			err => {
				this.toastr.error(err.error['message'], 'Reservation');
			}
		);
	}
}
