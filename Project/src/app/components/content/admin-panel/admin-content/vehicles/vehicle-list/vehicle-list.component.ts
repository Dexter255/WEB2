import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/rent-a-car/vehicle.model';
import { ActivatedRoute, Params } from '@angular/router';
import { RacCompaniesService } from '../../rac-companies/rac-companies.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];

  constructor(private route: ActivatedRoute,
    private racCompaniesService: RacCompaniesService) { }
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let companyId = +params['id'];
      this.vehicles = this.racCompaniesService.getVehicles(companyId);
    })
  }
}
