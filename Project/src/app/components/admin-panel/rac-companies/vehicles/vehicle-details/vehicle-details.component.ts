import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { VehicleService } from 'src/app/components/vehicle.service';
import { VehicleType } from 'src/app/models/rent-a-car/vehicle-type.model';
import { ServerService } from 'src/app/components/server.service';

@Component({
	selector: 'app-vehicle-details',
	templateUrl: './vehicle-details.component.html',
	styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

	constructor(private route: ActivatedRoute,
		private router: Router,
		public serverService: ServerService,
		public vehicleService: VehicleService) { }

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.vehicleService.getVehicle(+params['id']).subscribe(
				res => { },
				err => { }
			)
		});
	}

	getType(type: VehicleType): string {
		return VehicleType[type];
	}

	onReserve(vehicleId: number) {
		this.router.navigate(['../../reserve', vehicleId], { relativeTo: this.route });
	}
}
