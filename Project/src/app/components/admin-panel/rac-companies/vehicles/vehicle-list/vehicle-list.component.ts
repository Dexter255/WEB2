import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { VehicleService } from 'src/app/components/vehicle.service';
import { VehicleType } from 'src/app/models/rent-a-car/vehicle-type.model';
import { Vehicle } from 'src/app/models/rent-a-car/vehicle.model';

@Component({
	selector: 'app-vehicle-list',
	templateUrl: './vehicle-list.component.html',
	styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
	companyId: number

	constructor(private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastrService,
		public vehicleService: VehicleService) { }

	ngOnInit(): void {
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

	onAddVehicle() {
		this.router.navigate(['add'], { relativeTo: this.route });
	}

	onEditVehicle(vehicleId: number) {
		this.vehicleService.getVehicle(vehicleId).subscribe(
			(res: Vehicle) => {
				if(res.Reserved > 0)
					this.toastr.error('Unable to edit vehicle because it is reserved.', 'Vehicle');
				else
				this.router.navigate(['edit', vehicleId], { relativeTo: this.route });
			},
			err => {}
		)
	}

	onDeleteVehicle(vehicleId: number) {
		this.vehicleService.deleteVehicle(vehicleId).subscribe(
			res => {
				this.toastr.success('Vehicle was successfully deleted.', 'Vehicle');
				this.vehicleService.getVehicles(this.companyId).subscribe(
					res => {},
					err => {}
				);
			},
			err => {
				this.toastr.error(err.error['message'], 'Vehicle');
			}
		)
	}

	onDetailsVehicle(vehicleId: number) {
		this.router.navigate(['details', vehicleId], { relativeTo: this.route });
	}
}
