import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { VehicleService } from '../vehicle.service';
import { VehicleType } from 'src/app/models/rent-a-car/vehicle-type.model';

@Component({
	selector: 'app-vehicle-list-nicer',
	templateUrl: './vehicle-list-nicer.component.html',
	styleUrls: ['./vehicle-list-nicer.component.css']
})
export class VehicleListNicerComponent implements OnInit {
	searchVehicles: FormGroup;
	types: string[] = ['Cabriolet', 'Caravan', 'Saloon', 'Hatchback', 'Coupe', 'Miniven', 'SUV'];
	seats: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
	companyId: number;

	constructor(private route: ActivatedRoute,
		public vehicleService: VehicleService) { }

	ngOnInit(): void {
		this.searchVehicles = new FormGroup({
			'fromDate': new FormControl(null),
			'toDate': new FormControl(null),
			'brand': new FormControl(null),
			'type': new FormControl(null),
			'seat': new FormControl(null)
		});

		this.route.params.subscribe((params: Params) => {
			this.companyId = +params['id'];

			this.vehicleService.getVehicles(this.companyId).subscribe(
				res => { },
				err => { }
			);
		});
	}

	getType(type: VehicleType): string {
		return VehicleType[type];
	}

	onSortChange(sortBy: string) {
		if (sortBy === '0') {
			this.vehicleService.vehicles = this.vehicleService.vehicles.sort((a, b) => (a.Brand > b.Brand) ? 1 : -1);
		}
		else if (sortBy === '1') {
			this.vehicleService.vehicles = this.vehicleService.vehicles.sort((a, b) => (a.Brand > b.Brand) ? -1 : 1);
		}
		else if (sortBy === '2') {
			this.vehicleService.vehicles = this.vehicleService.vehicles.sort((a, b) => (a.HorsePower > b.HorsePower) ? 1 : -1);
		}
		else if (sortBy === '3') {
			this.vehicleService.vehicles = this.vehicleService.vehicles.sort((a, b) => (a.HorsePower > b.HorsePower) ? -1 : 1);
		}
		else if (sortBy === '2') {
			this.vehicleService.vehicles = this.vehicleService.vehicles.sort((a, b) => (a.YearOfProduction > b.YearOfProduction) ? 1 : -1);
		}
		else if (sortBy === '3') {
			this.vehicleService.vehicles = this.vehicleService.vehicles.sort((a, b) => (a.YearOfProduction > b.YearOfProduction) ? -1 : 1);
		}
	}
	
	onSearch() {
		let fromDate = this.searchVehicles.get('fromDate').value;
		let toDate = this.searchVehicles.get('toDate').value;
		let brand = this.searchVehicles.get('brand').value;
		let type = this.searchVehicles.get('type').value;
		let seat = this.searchVehicles.get('seat').value;

		let body: any = {};
		if (fromDate !== null)
			body.FromDate = fromDate;
		if(toDate !== null)
			body.ToDate = toDate;
		if(brand !== null)
			body.Brand = brand;
		if(type !== null)
			body.Type = type;
		if(seat !== null)
			body.Seat = seat;

		this.vehicleService.searchVehicles(this.companyId, body).subscribe(
			res => {},
			err => {}
		);
	}

	onReset() {
		this.vehicleService.getVehicles(this.companyId).subscribe(
			res => {
				this.searchVehicles.setValue({
					'fromDate': null,
					'toDate': null,
					'brand': null,
					'type': null,
					'seat': null
				});
			},
			err => { }
		);
	}
}
