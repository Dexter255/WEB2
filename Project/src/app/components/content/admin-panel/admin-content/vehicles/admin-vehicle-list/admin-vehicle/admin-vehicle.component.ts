import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from 'src/app/models/rent-a-car/vehicle.model';
import { ServerService } from 'src/app/components/server.service';
import { RacCompaniesService } from '../../../rac-companies/rac-companies.service';

@Component({
  selector: '[app-admin-vehicle]',
  templateUrl: './admin-vehicle.component.html',
  styleUrls: ['./admin-vehicle.component.css']
})
export class AdminVehicleComponent implements OnInit {
  @Input() vehicle: Vehicle;
  @Input() id: number;

  constructor(public serverService: ServerService,
    private racCompaniesService: RacCompaniesService) { }

  ngOnInit(): void {
  }

  onDelete(){
    this.racCompaniesService.deleteVehicle(this.vehicle.belongsToCompany.companyName, this.id);
  }
}
