import { Component, OnInit } from '@angular/core';
import { RentACarCompany } from 'src/app/models/rent-a-car/rac-company.model';
import { ActivatedRoute, Params } from '@angular/router';
import { RacCompanyService } from '../../rac-company.service';

@Component({
  selector: 'app-rent-a-car-company-details',
  templateUrl: './rent-a-car-company-details.component.html',
  styleUrls: ['./rent-a-car-company-details.component.css']
})
export class RentACarCompanyDetailsComponent implements OnInit {
  racCompany: RentACarCompany;

  constructor(private route: ActivatedRoute,
    private racCompanyServices: RacCompanyService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let id = +params['id'];
      this.racCompany = this.racCompanyServices.getRacCompany(id);
    });
  }
}
