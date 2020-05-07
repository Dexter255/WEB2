import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/rent-a-car/vehicle.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RacCompaniesService } from '../../rac-companies/rac-companies.service';

@Component({
  selector: 'app-admin-vehicle-details',
  templateUrl: './admin-vehicle-details.component.html',
  styleUrls: ['./admin-vehicle-details.component.css']
})
export class AdminVehicleDetailsComponent implements OnInit {
  vehicle: Vehicle;

  constructor(private route: ActivatedRoute,
    private racCompaniesService: RacCompaniesService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let vehicleId = +params['id'];
      let companyId = this.route.snapshot['_routerState'].url.split('/')[3];
      this.vehicle = this.racCompaniesService.getVehicle(companyId, vehicleId);
    });
  }

}
