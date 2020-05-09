import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/rent-a-car/vehicle.model';
import { ActivatedRoute, Params } from '@angular/router';
import { RacCompanyService } from 'src/app/components/rac-company.service';
import { ServerService } from 'src/app/components/server.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  vehicle: Vehicle;

  constructor(private route: ActivatedRoute,
    private racCompanyService: RacCompanyService,
    public serverService: ServerService) { }
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let vehicleId = +params['id'];
      
      let path = this.route.snapshot['_routerState'].url.split('/');
      let companyId;
      if(path[1] === 'admin-panel')
        companyId = +this.route.snapshot['_routerState'].url.split('/')[3];
      else if(path[1] === 'rac-companies')
        companyId = +this.route.snapshot['_routerState'].url.split('/')[2];
  
      this.vehicle = this.racCompanyService.getVehicle(companyId, vehicleId);
    });
  }
}
