import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RentACarCompany } from 'src/app/models/rent-a-car/rac-company.model';
import { RentACarService } from '../rent-a-car.service';

@Component({
  selector: 'app-rent-a-car-company-details',
  templateUrl: './rent-a-car-company-details.component.html',
  styleUrls: ['./rent-a-car-company-details.component.css']
})
export class RentACarCompanyDetailsComponent implements OnInit {
  racService: RentACarCompany;

  constructor(private rentACarService: RentACarService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id;
    this.route.params.subscribe( (params: Params) => {
      id = params['id'];
      this.racService =  this.rentACarService.getVehicle(id).belongsToCompany;
    })
  }

}
