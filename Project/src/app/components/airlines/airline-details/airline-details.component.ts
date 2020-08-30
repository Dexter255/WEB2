import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AirlineService } from '../../airline.service';

@Component({
	selector: 'app-airline-details',
	templateUrl: './airline-details.component.html',
	styleUrls: ['./airline-details.component.css']
})
export class AirlineDetailsComponent implements OnInit {

	constructor(private route: ActivatedRoute,
		private router: Router,
		public airlineService: AirlineService) { }

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			let id = +params['id'];
			this.airlineService.getAirline(id).subscribe(
				res => { },
				err => { }
			);
		})
	}

	onSeeFlights(airlineId: number) {
		this.router.navigate(['flights', airlineId]);
	}

	onSeeTickets(airlineId: number) {
		this.router.navigate(['tickets', airlineId]);
	}
}
