import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/rent-a-car/vehicle.model';
import { RacCompanyService } from '../../rac-company.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-vehicle-list-nicer',
  templateUrl: './vehicle-list-nicer.component.html',
  styleUrls: ['./vehicle-list-nicer.component.css']
})
export class VehicleListNicerComponent implements OnInit {
  vehicles: Vehicle[];

  constructor(private route: ActivatedRoute,
    private racCompanyService: RacCompanyService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let companyId = +params['id'];
      //this.vehicles = this.racCompanyService.getVehiclesSearch(companyId);
    });
  }

  onSearch(){

  }
  
  onReset(){
    
  }
}
