import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/rent-a-car/vehicle.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServerService } from 'src/app/components/server.service';
import { RacCompanyService } from 'src/app/components/rac-company.service';
import { RentACarCompany } from 'src/app/models/rent-a-car/rac-company.model';
import { VehicleService } from 'src/app/components/vehicle.service';
import { VehicleType } from 'src/app/models/rent-a-car/vehicle-type.model';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  notAllowed: boolean;
  companyId: number

  constructor(private route: ActivatedRoute,
    private router: Router,
    private racCompanyService: RacCompanyService,
    public vehicleService: VehicleService,
    private serverService: ServerService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.companyId = +params['id'];
      
      this.vehicleService.getVehicles(this.companyId);
      
      this.notAllowed = this.serverService.getUserType() !== 'Admin_RentACarCompanies' ? true : false;
    });
  }

  getType(type: VehicleType): string {
    return VehicleType[type];
  }
  
  onAddVehicle(){
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  onEditVehicle(vehicleId: number){
    this.router.navigate(['edit', vehicleId], {relativeTo: this.route});
  }
  
  onDeleteVehicle(vehicleId: number){
    this.vehicleService.deleteVehicle(vehicleId).subscribe(
      res => {
        this.vehicleService.getVehicles(this.companyId);
      },
      err => {
        console.log(err);
      }
    )
  }

  onDetailsVehicle(vehicleId: number){
    this.router.navigate(['details', vehicleId], {relativeTo: this.route});
  }
}
