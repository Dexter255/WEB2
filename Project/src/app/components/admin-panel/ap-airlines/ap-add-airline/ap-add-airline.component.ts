import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AirlineService } from 'src/app/components/airline.service';
import { Destination } from 'src/app/models/flight/destination.model';
import { Luggage } from 'src/app/models/flight/luggage.model';
import { Airline } from 'src/app/models/flight/airline.model';

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
		private airlineService: AirlineService) { }

	ngOnInit(): void {
		switch (this.route.snapshot['_routerState'].url.split('/')[3]) {
			case 'add':
				this.addAirline = new FormGroup({
					'id': new FormControl(0),
					'name': new FormControl(null, [Validators.required, Validators.minLength(4)]),
					'address': new FormControl(null, [Validators.required, Validators.minLength(4)]),
					'description': new FormControl(null, [Validators.required, Validators.minLength(4)]),
					'destinations': new FormArray([]),
					'luggageInfo': new FormArray([])
				});
				this.show = true;
				break;

			case 'edit':
				this.route.params.subscribe((params: Params) => {
					this.edit = true;
					this.header = "Edit airline";
					let airlineId = +params['id'];

					this.airlineService.getAirline(airlineId).subscribe(
						(res: Airline) => {
							this.addAirline = new FormGroup({
								'id': new FormControl(airlineId),
								'name': new FormControl(res.CompanyName, [Validators.required, Validators.minLength(4)]),
								'address': new FormControl(res.Address, [Validators.required, Validators.minLength(4)]),
								'description': new FormControl(res.Description, [Validators.required, Validators.minLength(4)]),
								'destinations': new FormArray([]),
								'luggageInfo': new FormArray([])
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
		let formControl = new FormControl(city, [Validators.required, Validators.minLength(2)]);

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
			[],
			[],
			luggageInfo,
			0);

		if (this.edit) {
			this.airlineService.updateAirline(airline).subscribe(
				res => {
					this.router.navigate(['../../'], { relativeTo: this.route });
				},
				err => {
					console.log(err);
				}
			);
		}
		else {
			this.airlineService.addAirline(airline).subscribe(
				res => {
					this.router.navigate(['../'], { relativeTo: this.route });
				},
				err => {
					console.log(err);
				}
			);
		}
	}
}
