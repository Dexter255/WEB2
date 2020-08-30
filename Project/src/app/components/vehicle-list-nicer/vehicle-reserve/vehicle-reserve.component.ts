import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { VehicleService } from '../../vehicle.service';
import { ReservedVehicle } from 'src/app/models/rent-a-car/reserved-vehicle.model';

@Component({
	selector: 'app-vehicle-reserve',
	templateUrl: './vehicle-reserve.component.html',
	styleUrls: ['./vehicle-reserve.component.css']
})
export class VehicleReserveComponent implements OnInit {
	reserveForm: FormGroup;
	vehicleId: number;

	constructor(private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastrService,
		public vehicleService: VehicleService) { }

	ngOnInit(): void {
		this.reserveForm = new FormGroup({
			'pickupDate': new FormControl(null, Validators.required),
			'getInCity': new FormControl(null, Validators.required),
			'returnDate': new FormControl(null, Validators.required),
			'returnToCity': new FormControl(null, Validators.required),
		});

		this.route.params.subscribe((params: Params) => {
			this.vehicleId = +params['id'];
		});
	}

	onReserve() {
		let reserveVehicle = new ReservedVehicle(
			this.vehicleId,
			this.reserveForm.get('pickupDate').value,
			this.reserveForm.get('getInCity').value,
			this.reserveForm.get('returnDate').value,
			this.reserveForm.get('returnToCity').value
		);

		this.vehicleService.reserveVehicle(reserveVehicle).subscribe(
			res => {
				this.toastr.success('Vehicle was successfully reserved.', 'Vehicle');
				this.router.navigate(['reservations']);
			},
			err => {
				this.toastr.error(err.error['message'], 'Vehicle');
			}
		);
	}
}
