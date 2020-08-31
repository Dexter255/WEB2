import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { FlightService } from '../flight.service';

@Component({
	selector: 'app-flight-list-nicer',
	templateUrl: './flight-list-nicer.component.html',
	styleUrls: ['./flight-list-nicer.component.css']
})
export class FlightListNicerComponent implements OnInit {
	searchFlights: FormGroup;
	airlineId: number;

	constructor(private route: ActivatedRoute,
		public flightService: FlightService) { }

	ngOnInit(): void {
		this.searchFlights = new FormGroup({
			'startDestination': new FormControl(null),
			'endDestination': new FormControl(null),
			'startDate': new FormControl(null),
			'ticketPrice': new FormControl(null)
		});

		this.route.params.subscribe((params: Params) => {
			this.airlineId = +params['id'];
			this.flightService.getFlights(this.airlineId).subscribe(
				res => {},
				err => {}
			);
		});
	}

	onSearch() {
		let startDestination = this.searchFlights.get('startDestination').value;
		let endDestination = this.searchFlights.get('endDestination').value;
		let startDate = this.searchFlights.get('startDate').value;
		let ticketPrice = this.searchFlights.get('ticketPrice').value;

		let body: any = {};

		if (startDestination !== null)
			body.StartDestination = startDestination;
		if (endDestination !== null)
			body.EndDestination = endDestination;
		if (startDate !== null)
			body.StartDate = startDate;
		if (ticketPrice !== null)
			body.TicketPrice = ticketPrice;

		this.flightService.searchFlights(this.airlineId, body).subscribe();
	}

	onReset() {
		this.flightService.getFlights(this.airlineId).subscribe(
			res => {
				this.searchFlights.setValue({
					'startDestination': null,
					'endDestination': null,
					'startDate': null,
					'ticketPrice': null
				});
			},
			err => {}
		);
	}

	onSortChange(sortBy: string) {
		if (sortBy === '0') {
			this.flightService.flights = this.flightService.flights.sort((a, b) => (a.TicketPrice > b.TicketPrice) ? 1 : -1);
		}
		else if (sortBy === '1') {
			this.flightService.flights = this.flightService.flights.sort((a, b) => (a.TicketPrice > b.TicketPrice) ? -1 : 1);
		}
		else if (sortBy === '2') {
			this.flightService.flights = this.flightService.flights.sort((a, b) => (a.Hours > b.Hours) ? 1 : -1);
		}
		else if (sortBy === '3') {
			this.flightService.flights = this.flightService.flights.sort((a, b) => (a.Hours > b.Hours) ? -1 : 1);
		}
	}
}
