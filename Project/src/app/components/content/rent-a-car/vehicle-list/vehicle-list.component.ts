import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/rent-a-car/vehicle.model';
import { RentACarService } from '../rent-a-car.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];

  constructor(private rentACarService: RentACarService) { }

  ngOnInit(): void {
    this.vehicles = this.rentACarService.getVehicles();
  }

}
