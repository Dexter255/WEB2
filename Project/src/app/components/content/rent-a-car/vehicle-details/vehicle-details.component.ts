import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/rent-a-car/vehicle.model';
import { RentACarService } from '../rent-a-car.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  vehicle: Vehicle;
  id: number;

  constructor(private rentACarService: RentACarService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // po default-u angular ne pravi novu komponentu ako se vec nalazimo na njoj i zbog toga treba da se pretplatimo na promene 
    // parametara u ruti
    this.route.params.subscribe( (params: Params) => {
      this.id = +params['id'];
      this.vehicle = this.rentACarService.getVehicle(this.id);
    } )
  }
}