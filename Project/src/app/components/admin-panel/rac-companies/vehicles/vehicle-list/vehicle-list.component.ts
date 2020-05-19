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
  notAllowed: boolean;
  companyId: number
  isFetching = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private racCompanyService: RacCompanyService,
    public vehicleService: VehicleService,
    private serverService: ServerService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.companyId = +params['id'];

      this.isFetching = true;
      this.vehicleService.getVehicles(this.companyId).subscribe(
        res => {
          this.vehicleService.vehicles = res as Vehicle[];
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
      
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
        this.isFetching = true;
        this.vehicleService.getVehicles(this.companyId).subscribe(
          res => {
            this.vehicleService.vehicles = res as Vehicle[];
            this.isFetching = false;
          }
        );
      },
      err => {
        console.log(err);
        this.isFetching = false;
      }
    )
  }

  onDetailsVehicle(vehicleId: number){
    this.router.navigate(['details', vehicleId], {relativeTo: this.route});
  }
}
