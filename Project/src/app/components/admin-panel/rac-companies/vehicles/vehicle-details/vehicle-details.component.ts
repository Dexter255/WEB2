import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/rent-a-car/vehicle.model';
import { ActivatedRoute, Params } from '@angular/router';
import { RacCompanyService } from 'src/app/components/rac-company.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  vehicle: Vehicle;

  constructor(private route: ActivatedRoute,
    private racCompanyService: RacCompanyService) { }
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let vehicleId = +params['id'];
      let companyId = +this.route.snapshot['_routerState'].url.split('/')[3];
      this.vehicle = this.racCompanyService.getVehicle(companyId, vehicleId);
    });
  }
}
