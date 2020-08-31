import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FlightService } from 'src/app/components/flight.service';
import { ServerService } from 'src/app/components/server.service';

@Component({
	selector: 'app-flight-details',
	templateUrl: './flight-details.component.html',
	styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {

	constructor(private route: ActivatedRoute,
		private router: Router,
		public flightService: FlightService,
		public serverService: ServerService) { }

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			let flightId = +params['id'];

			this.flightService.getFlight(flightId).subscribe(
				res => { },
				err => { }
			);
		});
	}

	convertDate(dateAndTime: Date): string {
		let dateTime = dateAndTime.toLocaleString();
		let dateSplited = dateTime.split('T')[0].split('-');

		return dateSplited[2] + '-' + dateSplited[1] + '-' + dateSplited[0] + ' ' + dateTime.split('T')[1];
	}

	onReserve(flightId: number) {
		this.router.navigate(['../../reserve', flightId], { relativeTo: this.route });
	}
}
