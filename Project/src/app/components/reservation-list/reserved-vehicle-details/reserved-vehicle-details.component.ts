import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { VehicleService } from '../../vehicle.service';
import { VehicleType } from 'src/app/models/rent-a-car/vehicle-type.model';

@Component({
	selector: 'app-reserved-vehicle-details',
	templateUrl: './reserved-vehicle-details.component.html',
	styleUrls: ['./reserved-vehicle-details.component.css']
})
export class ReservedVehicleDetailsComponent implements OnInit {

	constructor(private route: ActivatedRoute,
		private router: Router,
		public vehicleService: VehicleService) { }

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.vehicleService.getReservedVehicle(+params['id']).subscribe(
				res => { 
					this.vehicleService.getVehicle(this.vehicleService.reservedVehicle.VehicleId).subscribe(
						res => {},
						err => {}
					);
				},
				err => { }
			)
		});
	}

	convertDate(dateAndTime: Date): string {
		let dateTime = dateAndTime.toLocaleString();
		let dateSplited = dateTime.split('T')[0].split('-');

		return dateSplited[2] + '-' + dateSplited[1] + '-' + dateSplited[0];
	}

	getType(type: VehicleType): string {
		return VehicleType[type];
	}
}