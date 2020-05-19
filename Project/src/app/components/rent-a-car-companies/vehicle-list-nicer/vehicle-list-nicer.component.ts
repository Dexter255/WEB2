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
  isFetching = false;

  constructor(private route: ActivatedRoute,
    public vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let companyId = +params['id'];

      this.isFetching = true;
      this.vehicleService.getVehicles(companyId).subscribe(
        res => {
          this.vehicleService.vehicles = res as Vehicle[];
          this.isFetching = false;
        },
        err => {
          console.log(err);
          this.isFetching = false;
        }
      );
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
