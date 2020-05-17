import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/rent-a-car/vehicle.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ServerService } from 'src/app/components/server.service';
import { VehicleService } from 'src/app/components/vehicle.service';
import { VehicleType } from 'src/app/models/rent-a-car/vehicle-type.model';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  vehicle: Vehicle;

  constructor(private route: ActivatedRoute,
    private vehicleService: VehicleService,
    public serverService: ServerService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let vehicleId = +params['id'];

      this.vehicleService.getVehicle(vehicleId).subscribe(
        res => {
          this.vehicle = res as Vehicle;
        },
        err => {
          console.log(err);
        }
      )
    });
  }

  getType(type: VehicleType): string {
    return VehicleType[type];
  }
  
  onReserve() {
    //this.racCompanyService.reserveVehicle(this.companyId, this.vehicle.id);
  }
}
