import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { FlightService } from '../../flight.service';
import { VehicleService } from '../../vehicle.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-rate',
	templateUrl: './rate.component.html',
	styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {
	id: number;
	rateForm: FormGroup;
	title: string;

	constructor(private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastrService,
		public flightService: FlightService,
		public vehicleService: VehicleService) { }

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.id = +params['id'];
		});

		switch (this.route.snapshot['_routerState'].url.split('/')[2]) {
			case 'flight':
				this.title = 'Flight rating';
				break;
			
			case 'vehicle':
				this.title = 'Vehicle rating';
				break;
		}

		this.rateForm = new FormGroup({
			'companyRating': new FormControl(null, Validators.required),
			'rating': new FormControl(null, Validators.required),
		});
	}

	onSubmit() {
		switch (this.route.snapshot['_routerState'].url.split('/')[2]) {
			case 'flight':
				this.flightService.rateFlight(this.id, this.rateForm.get('companyRating').value, this.rateForm.get('rating').value).subscribe(
					res => {
						this.router.navigate(['reservations']);
						this.toastr.success(res['message'], 'Flight')
					},
					err => {}
				);
				break;

			case 'vehicle':
				this.vehicleService.rateVehicle(this.id, this.rateForm.get('companyRating').value, this.rateForm.get('rating').value).subscribe(
					res => {
						this.router.navigate(['reservations']);
						this.toastr.success(res['message'], 'Flight')
					},
					err => {}
				);
				break;
		}
	}
}
