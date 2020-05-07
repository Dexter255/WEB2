import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/rent-a-car/vehicle.model';
import { RacCompaniesService } from '../../rac-companies/rac-companies.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-admin-vehicle-list',
  templateUrl: './admin-vehicle-list.component.html',
  styleUrls: ['./admin-vehicle-list.component.css']
})
export class AdminVehicleListComponent implements OnInit {
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
