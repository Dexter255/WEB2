import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AirlineService } from 'src/app/components/airline.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-ap-airline-list',
	templateUrl: './ap-airline-list.component.html',
	styleUrls: ['./ap-airline-list.component.css']
})
export class ApAirlineListComponent implements OnInit {

	constructor(private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastrService,
		public airlineService: AirlineService) { }

	ngOnInit(): void {
		this.airlineService.getAirlines().subscribe();
	}

	onAddAirline() {
		this.router.navigate(['add'], { relativeTo: this.route });
	}

	onDeleteAirline(airlineId: number) {
		this.airlineService.deleteAirline(airlineId).subscribe(
			res => {
				this.toastr.success('Airline was successfully deleted.', 'Airline');
				this.airlineService.getAirlines().subscribe();
			},
			err => {
				this.toastr.error(err.error['message'], 'Airline');
			}
		);
	}

	onEditAirline(airlineId: number) {
		this.router.navigate(['edit', airlineId], { relativeTo: this.route });
	}

	onDetailsAirline(airlineId: number) {
		this.router.navigate(['details', airlineId], { relativeTo: this.route });
	}

	onSeeFlights(airlineId: number) {
		this.router.navigate([airlineId, 'flights'], { relativeTo: this.route });
	}

	onSeeIncome(airlineId: number) {
		this.router.navigate([airlineId, 'income'], { relativeTo: this.route });
	}
}
