import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { RacCompanyService } from 'src/app/components/rac-company.service';
import { VehicleType } from 'src/app/models/rent-a-car/vehicle-type.model';
import { VehicleService } from 'src/app/components/vehicle.service';
import { Vehicle } from 'src/app/models/rent-a-car/vehicle.model';
import { FreeDate } from 'src/app/models/rent-a-car/free-date.model';
import { RentACarCompany } from 'src/app/models/rent-a-car/rac-company.model';

@Component({
	selector: 'app-add-vehicle',
	templateUrl: './add-vehicle.component.html',
	styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
	addVehicle: FormGroup;
	show: boolean = false;
	header: string = 'Add vehicle';

	types: string[] = ['Cabriolet', 'Caravan', 'Saloon', 'Hatchback', 'Coupe', 'Miniven', 'SUV'];
	seats: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

	constructor(private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastrService,
		private vehicleService: VehicleService,
		private racCompanyService: RacCompanyService) { }

	ngOnInit(): void {
		let companyId = +this.route.parent.snapshot.params['id'];

		switch (this.route.snapshot['_routerState'].url.split('/')[5]) {
			case 'add':
				this.addVehicle = new FormGroup({
					'companyId': new FormControl(companyId),
					'vehicleId': new FormControl(0),
					'brand': new FormControl(null, [Validators.required, Validators.minLength(2)]),
					'model': new FormControl(null, [Validators.required, Validators.minLength(2)]),
					'type': new FormControl(null, Validators.required),
					'cubicCapacity': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
					'horsePower': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
					'yearOfProduction': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
					'kilometer': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
					'seat': new FormControl(null, Validators.required),
					'date': new FormGroup({
						'freeFrom': new FormControl(null, [Validators.required, this.checkDate]),
						'freeTo': new FormControl(null, [Validators.required, this.checkDate])
					}, this.compareDates),
					'pricePerDay': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')])
				});

				this.show = true;
				break;

			case 'edit':
				this.route.params.subscribe((params: Params) => {
					this.header = "Edit vehicle";
					let vehicleId = +params['id'];

					let vehicle;
					this.vehicleService.getVehicle(vehicleId).subscribe(
						res => {
							vehicle = res as Vehicle;

							this.addVehicle = new FormGroup({
								'companyId': new FormControl(companyId),
								'vehicleId': new FormControl(vehicleId),
								'brand': new FormControl(vehicle.Brand, [Validators.required, Validators.minLength(2)]),
								'model': new FormControl(vehicle.Model, [Validators.required, Validators.minLength(2)]),
								'type': new FormControl(VehicleType[vehicle.Type], Validators.required),
								'cubicCapacity': new FormControl(vehicle.CubicCapacity.toString(), [Validators.required, Validators.pattern('^[0-9]*$')]),
								'horsePower': new FormControl(vehicle.HorsePower.toString(), [Validators.required, Validators.pattern('^[0-9]*$')]),
								'yearOfProduction': new FormControl(vehicle.YearOfProduction.toString(), [Validators.required, Validators.pattern('^[0-9]*$')]),
								'kilometer': new FormControl(vehicle.Kilometers.toString(), [Validators.required, Validators.pattern('^[0-9]*$')]),
								'seat': new FormControl(vehicle.NumberOfSeats.toString(), Validators.required),
								'freeDates': new FormArray([]),
								'pricePerDay': new FormControl(vehicle.PricePerDay, [Validators.required, Validators.pattern('^[0-9]*$')]),
								'rating': new FormControl(vehicle.Rating),
								'ratedCount': new FormControl(vehicle.RatedCount)
							});

							vehicle.FreeDates.forEach(element => {
								// let date = this.formatDate(element.Date.split('T')[0]);
								this.onAddDate(element.Date.split('T')[0]);
							});
							this.show = true;
						},
						err => {}
					)
				});
				break;
		}
	}

	checkDate(control: FormControl): { [error: string]: boolean } {
		let currentDate = new Date();

		if (control.value !== null) {
			let date = new Date(control.value);

			if (date < currentDate) {
				return { 'currentDate': true };
			}
			else {
				return null;
			}
		}

		return null;
	}

	compareDates(formGroup: FormGroup): { [error: string]: boolean } {
		if (formGroup.get('freeFrom').value !== null && formGroup.get('freeTo').value !== null) {
			if (new Date(formGroup.get('freeFrom').value) > new Date(formGroup.get('freeTo').value)) {
				return { 'freeFromGreater': true };
			}
		}

		return null;
	}

	// formatDate(dateString: string): string {
	// 	var temp = dateString.split('-');
	// 	// var date = new Date(+temp[0], +temp[1], +temp[2]);

	// 	// let month: string = date.getMonth() < 10 ? '0' + date.getMonth().toString() : date.getMonth().toString();
	// 	// let day: string;
	// 	// if(date.getDate() == 31)
	// 	// 	day= (date.getDate() - 1) < 10 ? '0' + date.getDate().toString() : date.getDate().toString();
	// 	// else
	// 	// 	day = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString();

	// 	let a = temp[0] + '-' + temp[1] + '-' + temp[2];
	// 	return a;
	// }

	onAddDate(freeDate: string = null) {
		let date = new FormControl(freeDate, Validators.required);

		(<FormArray>this.addVehicle.get('freeDates')).push(date);
	}

	onDeleteDate(index: number) {
		(<FormArray>this.addVehicle.get('freeDates')).removeAt(index);
	}

	onSubmit() {
		if (this.addVehicle.get('vehicleId').value !== 0) {
			let freeDates: FreeDate[] = [];

			this.addVehicle.get('freeDates').value.forEach(element => {
				freeDates.push(new FreeDate(0, new Date(element)));
			});

			let vehicle = new Vehicle(
				this.addVehicle.get('vehicleId').value,
				this.addVehicle.get('brand').value.trim(),
				this.addVehicle.get('model').value.trim(),
				+VehicleType[this.addVehicle.get('type').value],
				this.addVehicle.get('cubicCapacity').value,
				this.addVehicle.get('horsePower').value,
				this.addVehicle.get('yearOfProduction').value,
				this.addVehicle.get('kilometer').value,
				this.addVehicle.get('seat').value,
				freeDates,
				this.addVehicle.get('pricePerDay').value,
				this.addVehicle.get('rating').value,
				this.addVehicle.get('ratedCount').value);

			this.vehicleService.updateVehicle(vehicle).subscribe(
				res => {
					this.toastr.success('Vehicle was successfully edited.', 'Vehicle');
					this.router.navigate(['../../'], { relativeTo: this.route });
				},
				err => { }
			);
		}
		else {
			this.racCompanyService.getRacCompany(this.addVehicle.get('companyId').value).subscribe(
				res => {
					let racCompany = res as RentACarCompany;

					let freeDates: FreeDate[] = [];
					let freeFromDate = new Date(this.addVehicle.get('date').get('freeFrom').value);
					let freeToDate = new Date(this.addVehicle.get('date').get('freeTo').value);

					freeFromDate.setDate(freeFromDate.getDate() + 1);
					freeToDate.setDate(freeToDate.getDate() + 1);
					while (freeFromDate <= freeToDate) {
						freeDates.push(new FreeDate(0, new Date(freeFromDate.toDateString())));
						freeFromDate.setDate(freeFromDate.getDate() + 1);
					}

					let vehicle = new Vehicle(
						this.addVehicle.get('vehicleId').value,
						this.addVehicle.get('brand').value.trim(),
						this.addVehicle.get('model').value.trim(),
						+VehicleType[this.addVehicle.get('type').value],
						this.addVehicle.get('cubicCapacity').value,
						this.addVehicle.get('horsePower').value,
						this.addVehicle.get('yearOfProduction').value,
						this.addVehicle.get('kilometer').value,
						this.addVehicle.get('seat').value,
						freeDates,
						this.addVehicle.get('pricePerDay').value,
						0,
						0);

					racCompany.Vehicles.push(vehicle);
					this.racCompanyService.updateRacCompany(racCompany).subscribe(
						res => {
							this.toastr.success('Vehicle was successfully added.', 'Vehicle');
							this.router.navigate(['../'], { relativeTo: this.route });
						},
						err => { }
					)
				},
				err => { }
			)
		}
	}
}
