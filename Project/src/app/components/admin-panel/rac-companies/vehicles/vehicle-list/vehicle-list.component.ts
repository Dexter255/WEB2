import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/rent-a-car/vehicle.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RacCompanyService } from 'src/app/components/rac-company.service';
import { ServerService } from 'src/app/components/server.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  companyId: number;
  notAllowed: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private racCompanyService: RacCompanyService,
    private serverService: ServerService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.companyId = +params['id'];
      this.vehicles = this.racCompanyService.getVehicles(this.companyId);  // prepraviti
      
      this.notAllowed = this.serverService.getUserType() !== 'Admin_RentACarCompanies' ? true : false;
      
    });
  }

  onAddVehicle(){
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  onEditVehicle(vehicleId: number){
    this.router.navigate(['edit', vehicleId], {relativeTo: this.route});
  }
  
  onDeleteVehicle(vehicleId: number){
    this.racCompanyService.deleteVehicle(this.companyId, vehicleId);
  }

  onDetailsVehicle(vehicleId: number){
    this.router.navigate(['details', vehicleId], {relativeTo: this.route});
  }
}
