import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/rent-a-car/vehicle.model';
import { RacCompanyService } from '../../rac-company.service';
import { ActivatedRoute, Params } from '@angular/router';
import { RentACarCompany } from 'src/app/models/rent-a-car/rac-company.model';
import { VehicleType } from 'src/app/models/rent-a-car/vehicle-type.model';
import { VehicleService } from '../../vehicle.service';

@Component({
  selector: 'app-vehicle-list-nicer',
  templateUrl: './vehicle-list-nicer.component.html',
  styleUrls: ['./vehicle-list-nicer.component.css']
})
export class VehicleListNicerComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    public vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let companyId = +params['id'];
      this.vehicleService.getVehicles(companyId);
    });
  }

  getType(type: VehicleType): string {
    return VehicleType[type];
  }
  
  onSearch(){

  }
  
  onReset(){
    
  }
}
