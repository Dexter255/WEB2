import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Airline } from 'src/app/models/flight/airline.model';
import { Luggage } from 'src/app/models/flight/luggage.model';
import { Destination } from 'src/app/models/flight/destination.model';
import { AirlineService } from 'src/app/components/airline.service';

@Component({
	selector: 'app-ap-add-airline',
	templateUrl: './ap-add-airline.component.html',
	styleUrls: ['./ap-add-airline.component.css']
})
export class ApAddAirlineComponent implements OnInit {
	addAirline: FormGroup;
	edit: boolean = false;
	header: string = 'Add airline';
	show: boolean = false;

	constructor(private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastrService,
		private airlineService: AirlineService) { }

	ngOnInit(): void {
		this.addAirline = new FormGroup({
			'id': new FormControl(0),
			'name': new FormControl(null, [Validators.required, Validators.minLength(4)]),
			'address': new FormControl(null, [Validators.required, Validators.minLength(4)]),
			'description': new FormControl(null, [Validators.required, Validators.minLength(4)]),
			'destinations': new FormArray([]),
			'luggageInfo': new FormArray([]),
			'rating': new FormControl(0)
		});
		
		switch (this.route.snapshot['_routerState'].url.split('/')[3]) {
			case 'add':
				this.show = true;
				break;

			case 'edit':
				this.route.params.subscribe((params: Params) => {
					this.edit = true;
					this.header = "Edit airline";
					let airlineId = +params['id'];

					this.airlineService.getAirline(airlineId).subscribe(
						(res: Airline) => {
							this.addAirline.setValue({
								'id': airlineId,
								'name': res.CompanyName,
								'address': res.Address,
								'description': res.Description,
								'destinations': [],
								'luggageInfo': [],
								'rating': res.Rating
							});

							res.Destinations.forEach(element => {
								this.onAddDestination(element.City);
							});

							res.LuggageInfo.forEach(element => {
								this.onAddLuggageInfo(element.Weight, element.Price);
							});
							this.show = true;
						},
						err => {

						}
					);
				});
				break;
		}
	}

	onAddDestination(city: string = null) {
		let formControl = new FormControl(city, [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.minLength(2)]);

		(<FormArray>this.addAirline.get('destinations')).push(formControl);
	}

	onDeleteDestination(index: number) {
		(<FormArray>this.addAirline.get('destinations')).removeAt(index);
	}

	onAddLuggageInfo(weight: number = null, price: number = null) {
		let formGroup = new FormGroup({
			'weight': new FormControl(weight, [Validators.required, Validators.pattern('^[0-9]*$')]),
			'price': new FormControl(price, [Validators.required, Validators.pattern('^[0-9]*$')])
		});

		(<FormArray>this.addAirline.get('luggageInfo')).push(formGroup);
	}

	onDeleteLuggageInfo(index: number) {
		(<FormArray>this.addAirline.get('luggageInfo')).removeAt(index);
	}

	onSubmit() {
		let destinations: Destination[] = [];
		let luggageInfo: Luggage[] = [];

		this.addAirline.get('destinations').value.forEach(element => {
			destinations.push(new Destination(0, element));
		});

		this.addAirline.get('luggageInfo').value.forEach(element => {
			luggageInfo.push(new Luggage(0, +element.weight, +element.price));
		});

		let airline = new Airline(
			this.addAirline.get('id').value,
			this.addAirline.get('name').value,
			this.addAirline.get('address').value,
			this.addAirline.get('description').value,
			destinations,
			luggageInfo,
			[],
			this.addAirline.get('rating').value);

		if (this.edit) {
			this.airlineService.updateAirline(airline).subscribe(
				res => {
					this.toastr.success('Airline was successfully edited.', 'Airline');
					this.router.navigate(['../../'], { relativeTo: this.route });
				},
				err => {}
			);
		}
		else {
			this.airlineService.addAirline(airline).subscribe(
				res => {
					this.toastr.success('Airline was successfully added.', 'Airline');
					this.router.navigate(['../'], { relativeTo: this.route });
				},
				err => {}
			);
		}
	}
}
